#!/usr/bin/env node

/**
 * 修复主题包的国际化文案
 * 将头像的 hover 提示从"我好看吗"改为"玉面郎君"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localeFilePath = path.join(__dirname, '../node_modules/vitepress-theme-teek/es/locale/lang/zh-cn.mjs');

console.log('Fixing locale text...');

try {
  if (fs.existsSync(localeFilePath)) {
    let content = fs.readFileSync(localeFilePath, 'utf8');

    // 替换头像的 hover 提示 (使用Unicode转义序列)
    const oldPattern = /avatarTitle: "\\u6211\\u597D\\u770B\\u5417"/;
    const newText = 'avatarTitle: "\\u7389\\u9762\\u90CE\\u541B"';

    if (oldPattern.test(content)) {
      content = content.replace(oldPattern, newText);
      fs.writeFileSync(localeFilePath, content, 'utf8');
      console.log('✅ Locale text fixed successfully!');
      console.log('   Avatar hover title changed from "我好看吗" to "玉面郎君"');
    } else if (content.includes('avatarTitle: "\\u7389\\u9762\\u90CE\\u541B"')) {
      console.log('ℹ️  Locale text already fixed, no need to repeat');
    } else {
      console.log('⚠️  Target text not found, file content may have changed');
    }
  } else {
    console.log('⚠️  Locale file not found, please run pnpm install first');
  }
} catch (error) {
  console.error('❌ Fix failed:', error.message);
  process.exit(1);
}
