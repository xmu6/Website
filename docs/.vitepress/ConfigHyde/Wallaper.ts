// 首页壁纸 - 本地静态壁纸列表
// 原远程壁纸服务 imgapi.onedayxyy.cn 已失效，统一使用 docs/public/bizhi 下的本地壁纸

const fallbackImages = [
    "/bizhi/1.webp",
    "/bizhi/2.webp",
    "/bizhi/3.webp",
    "/bizhi/4.webp",
    "/bizhi/5.webp",
    "/bizhi/6.webp",
    "/bizhi/7.webp",
    "/bizhi/8.webp",
    "/bizhi/9.webp",
    "/bizhi/10.webp",
    "/bizhi/11.webp",
    "/bizhi/12.webp",
    "/bizhi/13.webp",
    "/bizhi/14.webp",
    "/bizhi/15.webp",
    "/bizhi/16.webp",
    "/bizhi/17.webp",
    "/bizhi/18.webp",
    "/bizhi/19.webp",
    "/bizhi/20.webp",
    "/bizhi/21.webp",
    "/bizhi/22.webp",
    "/bizhi/23.webp",
    "/bizhi/24.webp",
    "/bizhi/25.webp",
    "/bizhi/26.webp",
    "/bizhi/27.webp",
    "/bizhi/28.webp",
    "/bizhi/29.webp",
    "/bizhi/30.webp",
];

// 保留异步签名以兼容 DynamicWallpaperManager.vue 的调用
async function fetchDynamicWallpapers(): Promise<string[]> {
  return fallbackImages;
}

// 导出的Wallpaper数组 - 服务端渲染与客户端均使用本地壁纸
export const Wallpaper: string[] = fallbackImages;

// 导出动态获取函数供主题使用
export { fetchDynamicWallpapers };
