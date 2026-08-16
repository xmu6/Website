<template>
  <TkPageCard :title="wechatAccount.title">
    <div class="wechat-card">
      <!-- 公众号内容 -->
      <div class="wechat-content">
        <!-- 公众号图片 -->
        <div class="wechat-qrcode-container">
          <img 
            class="wechat-qrcode" 
            :src="wechatAccount.qrcodeImage" 
            :alt="wechatAccount.subtitle"
            loading="lazy"
          >
        </div>
        
        <!-- 公众号描述 -->
        <div class="wechat-description">
          <h3 class="wechat-name">
            {{ wechatAccount.subtitle }}
          </h3>
          <p class="wechat-intro">
            {{ wechatAccount.description }}
          </p>
        </div>

        <!-- 底部操作区 -->
        <div class="wechat-footer">
          <a class="follow-link" :href="wechatAccount.followLink" :target="getTargetValue()">
            <span>{{ wechatAccount.followText }}</span>
            <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <line x1="20" y1="8" x2="20" y2="14"/>
              <line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </TkPageCard>
</template>

<script setup lang="ts">
import { TkPageCard } from "vitepress-theme-teek";

// 公众号内容类型
interface WechatAccount {
  title: string;         // 卡片标题
  subtitle: string;      // 公众号名称
  description: string;   // 公众号简介
  qrcodeImage: string;   // 公众号二维码图片路径
  followLink: string;    // 关注链接
  followText: string;    // 关注按钮文本
}

// 公众号内容 - 请替换为您自己的信息
const wechatAccount: WechatAccount = {
  title: '📱 关注公众号',
  subtitle: '我的公众号',  // 替换为您的公众号名称
  description: '分享前端开发技巧、运维知识、VitePress使用经验和技术成长心得，欢迎关注交流！',  // 替换为您的公众号简介
  qrcodeImage: '/img/wechat/wechat.png',  // 本地静态图，如需公众号二维码请替换为实际图片
  followLink: '/img/wechat/wechat.png',  // 可以替换为公众号文章链接或相关页面
  followText: '扫码关注',
};

// 判断是否为外链
const isExternalLink = (): boolean => {
  const url: string = wechatAccount.followLink
  return /^(https?:\/\/|\/\/)/.test(url);
};

// 获取网页打开方式
const getTargetValue = (): string => {
  return isExternalLink() ? '_blank' : '_self';
};
</script>

<style scoped>
.wechat-card {
  --link-color: #888;
  --link-hover: #6366f1;
}

html.dark .wechat-card {
  --link-color: #aaa;
  --link-hover: #818cf8;
}

.wechat-content {
  padding: 10px;
  text-align: center;
}

/* 公众号二维码样式 */
.wechat-qrcode-container {
  margin: 0 auto 16px;
  padding: 8px;
  background: #fff;
  border-radius: 8px;
  display: inline-block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

html.dark .wechat-qrcode-container {
  background: #2d2d2d;
}

.wechat-qrcode {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 4px;
}

/* 公众号描述样式 */
.wechat-description {
  margin-bottom: 16px;
}

.wechat-name {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
}

.wechat-intro {
  margin: 0;
  color: var(--text-color);
  line-height: 1.6;
  font-size: 14px;
  padding: 0 4px;
}

/* 底部操作区样式 */
.wechat-footer {
  display: flex;
  justify-content: center;
}

.follow-link {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  color: var(--link-color);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  gap: 6px;
  border-radius: 4px;
}

.follow-link:hover {
  color: var(--link-hover);
  background-color: rgba(99, 102, 241, 0.1);
}

.link-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.follow-link:hover .link-icon {
  transform: translateY(-2px);
}
</style>
    