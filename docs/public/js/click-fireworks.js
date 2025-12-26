// 等待页面完全加载后再初始化
function initClickFireworks() {
  class ClickFireworks {
    constructor() {
      this.init();
    }

    init() {
      document.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(e) {
      // 排除点击链接、按钮等可交互元素
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a, button, input, select, textarea')) {
        return;
      }

      // 创建爆炸效果
      this.createParticleExplosion(e.clientX, e.clientY);
      this.createCenterBurst(e.clientX, e.clientY);
    }



    // 创建粒子爆炸
    createParticleExplosion(x, y) {
      const particleCount = 25;
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
        '#FFD93D', '#6BCF7F', '#C06C84', '#F67280', '#355C7D',
        '#FF8CC3', '#7FCDCD', '#B4A7D6', '#FFE66D', '#A8E6CF'
      ];
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        // 随机颜色和发光效果
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 6px ${color}, 0 0 12px ${color}`;
        
        document.body.appendChild(particle);
        
        // 随机方向和速度
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const velocity = Math.random() * 8 + 4;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        // 随机形状
        const shape = Math.random();
        if (shape < 0.3) {
          particle.style.borderRadius = '0';
          particle.style.transform = `rotate(${Math.random() * 360}deg)`;
        }
        
        this.animateParticle(particle, vx, vy, color);
      }
    }

    // 创建中心爆发效果
    createCenterBurst(x, y) {
      const burstCount = 8;
      const coreColors = ['#FFD700', '#FFA500', '#FF6347', '#FF1493'];
      
      for (let i = 0; i < burstCount; i++) {
        const burst = document.createElement('div');
        burst.style.position = 'fixed';
        burst.style.left = x + 'px';
        burst.style.top = y + 'px';
        burst.style.width = '8px';
        burst.style.height = '8px';
        burst.style.borderRadius = '50%';
        burst.style.pointerEvents = 'none';
        burst.style.zIndex = '9997';
        
        const color = coreColors[Math.floor(Math.random() * coreColors.length)];
        burst.style.backgroundColor = color;
        burst.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
        burst.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(burst);
        
        const angle = (Math.PI * 2 * i) / burstCount;
        const velocity = 12;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        this.animateBurst(burst, vx, vy, color);
      }
    }

    // 粒子动画
    animateParticle(particle, vx, vy, color) {
      let x = 0, y = 0, opacity = 1, scale = 1;
      let gravity = 0.15;
      let vyCurrent = vy;
      let rotation = 0;
      
      const animate = () => {
        x += vx * 0.98; // 空气阻力
        vyCurrent += gravity;
        y += vyCurrent;
        opacity -= 0.015;
        scale *= 0.98;
        rotation += 8;
        
        particle.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`;
        particle.style.opacity = opacity;
        
        // 更新发光效果
        const glowSize = Math.max(2, 6 * opacity);
        particle.style.boxShadow = `0 0 ${glowSize}px ${color}, 0 0 ${glowSize * 2}px ${color}`;
        
        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      };
      
      requestAnimationFrame(animate);
    }

    // 爆发动画
    animateBurst(burst, vx, vy, color) {
      let x = 0, y = 0, opacity = 1, scale = 1;
      let vyCurrent = vy;
      
      const animate = () => {
        x += vx * 0.9;
        vyCurrent *= 0.95;
        y += vyCurrent;
        opacity -= 0.025;
        scale *= 1.05;
        
        burst.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
        burst.style.opacity = opacity;
        
        const glowSize = 15 * scale * opacity;
        burst.style.boxShadow = `0 0 ${glowSize}px ${color}, 0 0 ${glowSize * 2}px ${color}`;
        
        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          burst.remove();
        }
      };
      
      requestAnimationFrame(animate);
    }


  }

  // 初始化
  new ClickFireworks();
}

// 多种方式确保脚本加载
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initClickFireworks);
} else {
  initClickFireworks();
}

// 备用方案：如果DOM还没加载完，使用window.onload
window.addEventListener('load', function() {
  if (!window.clickFireworksLoaded) {
    initClickFireworks();
    window.clickFireworksLoaded = true;
  }
});