// 首页壁纸 - 动态获取本地图片服务器的图片

// 壁纸服务配置 - 统一配置服务地址，一处修改全局生效
export const WALLPAPER_SERVICE_CONFIG = {
  baseUrl: 'https://imgapi.onedayxyy.cn',
  apiEndpoint: '/api/images',
  get fullUrl() {
    return `${this.baseUrl}${this.apiEndpoint}`
  }
}

// 备用图片列表（当本地服务不可用时使用）
// 注意：public 目录下的文件路径不带前缀，VitePress 会根据 base 配置自动处理
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
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/1.webp",
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/2.webp",
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/3.webp", 
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/4.webp", 
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/5.webp", 
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/6.webp", 
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/7.webp", 
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/8.webp", 
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/9.webp", 
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/10.webp", 
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/11.webp", 
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/12.webp", 
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/13.webp", 
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/14.webp", 
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/15.webp", 
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/16.webp",
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/17.webp",
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/18.webp",
  // "https://img.onedayxyy.cn/images/Teek/TeekBg/19.webp",
];
// 动态获取图片列表的函数
async function fetchDynamicWallpapers(): Promise<string[]> {
  // try {
  //   // 使用统一配置的图片服务API
  //   const response = await fetch(WALLPAPER_SERVICE_CONFIG.fullUrl, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //     },
  //   });
  //
  //   if (!response.ok) {
  //     throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  //   }
  //
  //   const data = await response.json();
  //   const images = data.images || [];
  //
  //   // 将相对路径转换为完整的服务器URL
  //   const wallpapers = images.map((imagePath: string) => `${WALLPAPER_SERVICE_CONFIG.baseUrl}${imagePath}`);
  //
  //   // 如果获取到图片，返回动态图片列表，否则返回备用图片
  //   return wallpapers.length > 0 ? wallpapers : wallpapers;
  //
  // } catch (error) {
  //   console.warn('无法获取动态壁纸，使用备用图片:', error);
  //   return fallbackImages;
  // }
  return fallbackImages;
}

// 创建一个Promise来获取壁纸
let wallpaperPromise: Promise<string[]> | null = null;

// 获取壁纸的函数
function getWallpapers(): Promise<string[]> {
  if (!wallpaperPromise) {
    wallpaperPromise = fetchDynamicWallpapers();
  }
  return wallpaperPromise;
}

// 导出的Wallpaper数组 - 在服务端渲染时使用备用图片，客户端动态加载
export const Wallpaper: string[] = fallbackImages;

// 导出动态获取函数供主题使用
export { getWallpapers, fetchDynamicWallpapers };
