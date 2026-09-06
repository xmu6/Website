# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A personal knowledge-base / portfolio website ("Maolin Xiao / xiaomaolin.cn") built with **VitePress** using the **vitepress-theme-teek** (Teek) theme. Content is authored in Markdown; the theme extends VitePress to add a blog-style home, wallpaper, Live2D, friend links, comments (Twikoo), and custom layout modes. Deployed on **Cloudflare Pages**.

## Commands

> **Use pnpm only.** The README mandates pnpm; package.json's `postinstall` hook and the dev/build scripts depend on it.

- `pnpm install` — install dependencies. The `postinstall` hook runs `node scripts/fix-locale.js`, which **patches the installed theme package** in `node_modules`.
- `pnpm docs:dev` — start the dev server (`vitepress dev docs`).
- `pnpm docs:build` — production build. Uses `--max-old-space-size=131072` (128 GB heap) because the site is large; do not lower this casually.
- `pnpm docs:preview` — preview the built output.

Every script runs `node scripts/fix-locale.js` first. There are no test/lint scripts in this project.

### Critical: `scripts/fix-locale.js`

This script edits `node_modules/vitepress-theme-teek/es/locale/lang/zh-cn.mjs`, changing the avatar hover title from 我好看吗 to 玉面郎君. It returns "already fixed" if the patch is present and warns if the file content no longer matches. Because it writes into `node_modules`, it is **lost on any fresh install** and must re-run (the `postinstall` hook handles this). Be aware that editing/reinstalling dependencies can silently revert this — if the avatar tooltip shows the wrong text, re-run `pnpm install`.

## Architecture

### Content organization (`docs/`)

Markdown posts live in `docs/`, organized into numbered category folders. Each content page has a `permalink` in its frontmatter; the **generated URL route is decoupled from the folder path** via `docs/.vitepress/config.ts`.

The top-level folders map to URL prefixes through the `useTransformByRules` rules in `config.ts` (the `AutoFrontmatter` Vite plugin):

| Folder | URL prefix |
|--------|-----------|
| `10.运维` | `/linux/$uuid5` |
| `15.前端` | `/qianduan/$uuid5` |
| `20.编程` | `/code/$uuid5` |
| `25.黑客` | `/hacker/$uuid5` |
| `30.专题` | `/zhuanti/$uuid5` |
| `35.工具` | `/tools/$uuid5` |
| `40.生活` | `/life/$uuid5` |
| `45.精神小屋` | `/love/$uuid5` |
| `50.娱乐` | `/yule/$uuid5` |
| `55.兴趣` | `/xingqu/$uuid5` |
| `60.关于` | `/about/$uuid5` |
| `65.Teek` | `/teek/$uuid5` |
| `测试` | `/test/$uuid5` |
| `计算机` | `/computer/$uuid5` |
| `数据库` | `/database/$uuid5` |
| `爬虫` | `/crawler/$uuid5` |
| `Python` | `/python/$uuid5` |
| `AI` | `/ai/$uuid5` |

`$uuid5` is replaced at build time with a random 5-char string (see `docs/.vitepress/theme/composables/useTransform.ts`), so routes like `/linux/linux-index` or `/about/me` are stable while raw paths are obfuscated. Add a new mapping here when adding a new top-level content category.

### Config layering

1. `docs/.vitepress/config.ts` — the main VitePress config. Calls `defineTeekConfig({...})` to set the Teek theme options (blogger, wallpaper, category/tag cards, post, codeBlock, comment, backTop, etc.), then `defineConfig({ extends: teekConfig, ... })` to merge them into VitePress. It also wires plugins (`AutoFrontmatter`, `vitepress-plugin-group-icons`, `vitepress-markdown-timeline`) and the Algolia search.
2. `docs/.vitepress/ConfigHyde/` — per-feature config modules imported by `config.ts`: `Nav` (nav bar), `Comment` (Twikoo env), `Cover`/`Wallaper` (local wallpaper lists), `Head`, `SocialLinks`, `FooterInfo`, `FriendLink`, `HitokotoDate` (one-liner quotes for the banner typewriter), `SocialDate`. These hold the actual site content/identity and are where you edit navigation, friend links, comments, etc.
3. `docs/.vitepress/theme/config/teekConfig.ts` — exports named layout presets (`teekDocConfig`, `teekBlogConfig`, `teekBlogParkConfig`, etc.) used for different frontmatter `layout` modes.

### Theme customization (`docs/.vitepress/theme/`)

Custom code that extends the Teek theme:

- `theme/index.ts` — imports the Teek theme + its CSS, registers global components (Confetti, CoupleAlbum, PhotoCard, friend-link), initializes NProgress route transitions, the mouse-trail effect (`useGuangbiaoTX`), the copy-event composable, and a custom image viewer.
- `theme/components/` — site-specific Vue components (About page sections, DynamicWallpaperManager, OhMyLive2D, Timeline, Moments, Calendar/Schedule/Welcome/Notice cards, etc.).
- `theme/composables/` — reusable hooks (`useTransform`, `useCopyEvent`, `useRibbon`, `useRuntime`, `useIntersectionObserver`, `useMobileDetection`).
- The `Layout` export wraps `TeekLayoutProvider` and optionally injects a per-page `layoutClass` from frontmatter.

### Special pages (`docs/@pages/`)

`docs/@pages/` contains Teek's special index pages (categories, tags, archives, article overview, login, risk-link), each driven by a frontmatter flag such as `categoriesPage: true` or `archivesPage: true` with `layout: home`. These are consumed by the theme, not rendered as normal articles.

### Static assets

`docs/public/` holds site-static files served at root: `bizhi/` (wallpapers), `img/`, `mouse/`, `js/click-fireworks.js`, `favicon.ico`. Build output goes to `docs/.vitepress/dist/`. Config array references like `/bizhi/1.webp` resolve against this directory.

## Deployment

Build output is `docs/.vitepress/dist` (deployed to Cloudflare Pages). `sitemap.hostname` and the `editLink.pattern` in `config.ts` still point at the upstream template domain (`onedayxyy.cn`) — they are template leftovers and may need redirecting to `xiaomaolin.cn` if behavior is off.

## Gotchas

- **pnpm only** — `npm install` will break the postinstall/fix-locale flow.
- `docs/.vitepress/dist/` is a **git-ignored** build artifact directory (present locally, not committed). Safe to delete/rebuild.
- Content URLs are set by the permalink rules, not the on-disk folder, so renaming/moving a Markdown file changes nothing on the live site until its `permalink` (or a rule) is updated.
