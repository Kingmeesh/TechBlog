// 全局配置对象
if (!window.categoryBackgrounds) {
  window.categoryBackgrounds = {
    default: {
      normal: 'https://s2.loli.net/2025/03/09/MF5Ugvm8LSsGrkC.webp',
      dark: 'https://s2.loli.net/2025/03/09/MF5Ugvm8LSsGrkC.webp'
    },
    算法: {
      normal: 'https://s2.loli.net/2024/12/20/L3m7XhRW1btgMwe.jpg',
      dark: 'https://s2.loli.net/2024/12/20/L3m7XhRW1btgMwe.jpg'
    },
    小说: {
      normal: 'https://s2.loli.net/2024/12/20/3QpmyOqSzTKGURP.webp',
      dark: 'https://s2.loli.net/2024/12/20/MFRs5BEGUWtmKV9.webp'
    },
    随笔: {
      normal: 'https://s2.loli.net/2024/12/20/eN4XnLoTtguqbkC.webp',
      dark: 'https://s2.loli.net/2024/12/20/Hy9GoSM7crq4dXZ.webp'
    },
    摘录: {
      normal: 'https://s2.loli.net/2024/12/20/N7LWRl8ABKQgU9c.webp',
      dark: 'https://s2.loli.net/2024/12/23/7uhYcDjSxGVAv4q.webp'
    },
  };
}

/**
 * 获取当前页面类型
 */
function getPageType() {
  const pathname = window.location.pathname;
  if (pathname === '/' || pathname === '/index.html') return 'home';
  if (/^\/\d{4}\/\d{2}\/\d{2}\/.*/.test(pathname)) return 'post';
  if (pathname.includes('/categories/')) return 'category';
  if (pathname.includes('/post/') || pathname.includes('/posts/')) return 'post';
  return 'post';
}

/**
 * 获取文章分类
 */
function getPostCategory() {
  const possibleSelectors = [
    '.post-meta .category-link',
    '.post-meta a[href^="/categories/"]',
    '[property="article:section"]',
    '.post-categories a',
    '.categories a'
  ];

  for (const selector of possibleSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      return element.textContent.trim();
    }
  }

  const pathname = window.location.pathname;
  const match = pathname.match(/\/categories\/(.+?)(?:\/|$)/);
  if (match) {
    return decodeURIComponent(match[1]);
  }

  return null;
}

/**
 * 获取背景配置
 */
function getBackgroundConfig(pageType) {
  // 如果是主页，返回默认背景
  if (pageType === 'home') {
    return window.categoryBackgrounds.default;
  }

  const category = getPostCategory();
  if (category && window.categoryBackgrounds[category]) {
    return window.categoryBackgrounds[category];
  }
  return window.categoryBackgrounds.default;
}


/**
 * 获取主题模式
 */
function getThemeMode() {
  return document.documentElement.getAttribute('data-user-color-scheme') === 'dark' ? 'dark' : 'light';
}

/**
 * 设置背景图片
 */
function setBackgroundImage(themeMode) {
  const pageType = getPageType();
  const bgConfig = getBackgroundConfig(pageType); // 获取背景配置
  const isMobile = window.innerWidth < 768;  // 判断是否是手机端
  const webBgElement = document.querySelector('#web_bg'); // 获取背景元素

  if (!webBgElement) return;

  // 判断是否是手机端，使用暗黑背景
  const backgroundUrl = isMobile ? bgConfig.dark : (themeMode === 'dark' ? bgConfig.dark : bgConfig.normal);

  // 设置背景
  document.documentElement.style.setProperty('--current-background', `url(${backgroundUrl})`);
    webBgElement.style.backgroundImage = 'var(--current-background)';
}

/**
 * 重置Banner样式
 */
function resetBannerStyles() {
  const banner = document.querySelector("#banner");
  const mask = document.querySelector("#banner .mask");

  if (banner) banner.style.backgroundImage = 'none';
  if (mask) mask.style.backgroundColor = 'rgba(0,0,0,0)';
}

/**
 * 初始化背景
 */
function initBackground() {
  const theme = getThemeMode();
  setBackgroundImage(theme);
}

// 初始化执行
document.addEventListener('DOMContentLoaded', () => {
  initBackground();
  resetBannerStyles();

  // 监听主题切换
  const themeBtn = document.querySelector('#color-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const theme = getThemeMode();
      setBackgroundImage(theme);
    });
  }

  // 防抖处理的窗口大小变化监听
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setBackgroundImage(getThemeMode());
    }, 200);
  }, {
    passive: true
  });
});
