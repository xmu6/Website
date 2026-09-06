#!/usr/bin/env node

/**
 * 正文图片优化脚本
 *
 * 只优化正文里被 markdown（<img> 或 ![alt](...)) 引用的内容截图：
 * 生成「无损 WebP + 按显示宽度缩放 + srcset/width/height」，降低加载体积。
 *
 * 原则：
 *  - 只处理 docs/public 下、被正文引用的本地栅格图；排除壁纸/封面/图标等装饰目录。
 *  - 无损 WebP（像素级一致，不改清晰度）；只缩不升（never upscale）。
 *  - 保留原始原图，重写引用指向优化产物，并加 data-full-src 指向原图给图片查看器用。
 *  - 已带 data-full-src 的引用视为已处理，跳过（幂等，可重复运行）。
 *
 * 用法：
 *   node scripts/optimize-content-images.js --dry-run   # 只打印计划，不写入
 *   node scripts/optimize-content-images.js             # 生效
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');
const docsDir = path.join(root, 'docs');
const publicDir = path.join(docsDir, 'public');

const DRY_RUN = process.argv.includes('--dry-run');

// 显示基准宽度：正文内容列约 688~845px，取 880 覆盖常见布局；2x 用于 retina。
const BASE_WIDTH = 880;
const RETINA_WIDTH = 1760;
// 小于此宽度的图视为小图标/贴纸，跳过。
const MIN_WIDTH = 320;

// 装饰资源目录，避开（壁纸、封面、主题图标、live2d、鼠标特效等）
const EXCLUDE_TOP = new Set([
  'bizhi', 'covers', 'images', 'img', 'svg', 'mouse', 'login', 'js',
]);

// 重写时查询：URL -> 优化记录
const optByUrl = new Map();

// ---------- 工具 ----------
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['.vitepress', 'node_modules'].includes(e.name)) continue;
      walk(p, out);
    } else if (e.name.endsWith('.md')) {
      out.push(p);
    }
  }
  return out;
}

function toUrl(absPath) {
  return '/' + path.relative(publicDir, absPath).split(path.sep).join('/');
}

// ---------- 生成优化图（按原图路径缓存，同一张只生成一次） ----------
const genCache = new Map();

async function optimizeImage(url) {
  if (!url || !url.startsWith('/')) return null;
  const rel = url.replace(/^\//, '');
  const top = rel.split('/')[0];
  if (EXCLUDE_TOP.has(top)) return null;
  if (!/\.(png|jpe?g)$/i.test(rel)) return null;

  if (genCache.has(rel)) return { ...genCache.get(rel) };

  const phys = path.join(publicDir, rel);
  if (!fs.existsSync(phys)) return null;

  let meta;
  try {
    meta = await sharp(phys).metadata();
  } catch {
    return null;
  }
  if (!meta || !meta.width) return null;
  if (meta.width < MIN_WIDTH) return null;

  const natW = meta.width;
  const natH = meta.height;
  const w1 = Math.min(natW, BASE_WIDTH);
  const w2 = Math.min(natW, RETINA_WIDTH);
  const h1 = Math.round(natH * (w1 / natW));

  const ext = path.extname(phys);
  // 文件名里的空格会破坏 VitePress 的路径解析（markdown-it 在空格处截断），统一替换为下划线
  const safeName = path.basename(phys, ext).replace(/\s+/g, '_');
  const base = path.join(path.dirname(phys), safeName);
  const out1Path = `${base}-${w1}.webp`;
  const has2x = w2 > w1;
  const out2Path = has2x ? `${base}-${w2}.webp` : null;

  const ret = {
    rel,
    origUrl: toUrl(phys),
    url1x: toUrl(out1Path),
    url2x: has2x ? toUrl(out2Path) : null,
    w1,
    h1,
    natW,
    natH,
    origBytes: fs.statSync(phys).size,
    out1Bytes: 0,
    out2Bytes: 0,
  };

  if (!DRY_RUN) {
    await sharp(phys)
      .resize({ width: w1, withoutEnlargement: true })
      .webp({ lossless: true, effort: 6 })
      .toFile(out1Path);
    if (has2x) {
      await sharp(phys)
        .resize({ width: w2, withoutEnlargement: true })
        .webp({ lossless: true, effort: 6 })
        .toFile(out2Path);
    }
    ret.out1Bytes = fs.statSync(out1Path).size;
    ret.out2Bytes = has2x ? fs.statSync(out2Path).size : 0;

    // 保险：若 1x webp 不比原图小，则这张图不优化——删掉生成的 webp，保留原图引用，避免变重。
    if (ret.out1Bytes >= ret.origBytes) {
      fs.rmSync(out1Path, { force: true });
      if (has2x) fs.rmSync(out2Path, { force: true });
      return null;
    }
    // 若 2x webp 不比原图小，则不再提供 2x（避免 retina 端反而下载更大文件），只留 1x。
    if (has2x && ret.out2Bytes >= ret.origBytes) {
      fs.rmSync(out2Path, { force: true });
      ret.url2x = null;
      ret.out2Bytes = 0;
    }
  }

  genCache.set(rel, ret);
  return { ...ret };
}

// ---------- 重写 <img ...>（保留 alt/style/class 等，只替换 src 并注入新属性） ----------
function processImgTags(html) {
  return html.replace(/<img\b([^>]*)>/gi, (full, attrs) => {
    if (/\bdata-full-src\s*=/.test(attrs)) return full; // 已处理
    const srcM = attrs.match(/\bsrc\s*=\s*"(.*?)"/i) || attrs.match(/\bsrc\s*=\s*'(.*?)'/i);
    if (!srcM) return full;
    const opt = optByUrl.get(srcM[1]);
    if (!opt) return full;

    const selfClose = /\/\s*$/.test(attrs);
    // 去掉自闭合斜杠，末尾再统一补回，避免出现游离的 "/"
    const base = attrs.replace(/\/\s*$/, '');
    // 清除可能重复的属性，避免叠加
    let newAttrs = base.replace(/\s+(srcset|width|height|loading|decoding|data-full-src)\s*=\s*"[^"]*"/gi, '');
    newAttrs = newAttrs.replace(/\bsrc\s*=\s*"[^"]*"/i, (m) => {
      const set = `${opt.url1x} 1x${opt.url2x ? `, ${opt.url2x} 2x` : ''}`;
      return `src="${opt.url1x}" srcset="${set}" width="${opt.w1}" height="${opt.h1}" data-full-src="${opt.origUrl}"`;
    });
    if (!/\bloading\s*=/.test(newAttrs)) newAttrs += ' loading="lazy" decoding="async"';
    return '<img' + newAttrs + (selfClose ? ' />' : '>');
  });
}

// ---------- 重写 markdown ![alt](url) ----------
function processMdImages(mdText) {
  return mdText.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, alt, url) => {
    const opt = optByUrl.get(url);
    if (!opt) return m;
    const safeAlt = String(alt).replace(/"/g, '&quot;');
    const set = `${opt.url1x} 1x${opt.url2x ? `, ${opt.url2x} 2x` : ''}`;
    return `<img src="${opt.url1x}" srcset="${set}" alt="${safeAlt}" width="${opt.w1}" height="${opt.h1}" loading="lazy" decoding="async" data-full-src="${opt.origUrl}">`;
  });
}

// ---------- 主流程 ----------
async function main() {
  const mdFiles = walk(docsDir);
  const urlRe = /(?:<img\b[^>]*\bsrc\s*=\s*"(.*?)"|!\[[^\]]*\]\(([^)\s]+)\))/gi;
  const touched = new Set();
  let planBytes = 0;

  for (const md of mdFiles) {
    const text = fs.readFileSync(md, 'utf8');
    let m;
    urlRe.lastIndex = 0;
    while ((m = urlRe.exec(text))) {
      const url = (m[1] || m[2] || '').trim();
      if (!url || touched.has(url)) continue;
      const opt = await optimizeImage(url);
      if (opt) {
        touched.add(url);
        optByUrl.set(url, opt);
        planBytes += opt.origBytes;
      }
    }
  }

  console.log(`\n扫描 ${mdFiles.length} 个 markdown，命中 ${touched.size} 张正文内容图。`);
  console.log(`原图总量约 ${(planBytes / 1048576).toFixed(1)} MB。`);

  if (DRY_RUN) {
    console.log('\n[DRY RUN] 计划（未写入）：');
    for (const opt of genCache.values()) {
      console.log(`  ${opt.origUrl}  (${opt.natW}x${opt.natH})`);
      console.log(`     1x: ${opt.url1x}${opt.url2x ? `\n     2x: ${opt.url2x}` : ''}`);
    }
    return;
  }

  // 生成后重写 markdown（先处理裸 <img>，再处理 ![]()）
  for (const md of mdFiles) {
    const text = fs.readFileSync(md, 'utf8');
    const next = processMdImages(processImgTags(text));
    if (next !== text) {
      fs.writeFileSync(md, next, 'utf8');
      console.log(`重写 ${md.replace(root + path.sep, '')}`);
    }
  }

  let newBytes = 0;
  for (const opt of genCache.values()) newBytes += opt.out1Bytes + opt.out2Bytes;
  const saved = planBytes - newBytes;
  console.log(`\n生成 ${genCache.size} 张优化图（无损 WebP）。`);
  console.log(`原图 ${(planBytes / 1048576).toFixed(1)} MB -> 优化后约 ${(newBytes / 1048576).toFixed(1)} MB，省 ${(saved / 1048576).toFixed(1)} MB (${((saved / Math.max(planBytes, 1)) * 100).toFixed(0)}%)。`);
  console.log('原始 PNG 已保留；图片查看器将从 data-full-src 读取原图。');
}

await main();
