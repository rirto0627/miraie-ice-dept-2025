// App.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ConfigProvider } from 'antd';
// import { theme } from './style/theme.js';
import { HeroBanner } from './components/HeroBanner';
import { TimeLine } from './components/TimeLine';
import { Team } from './components/Team';
import { News } from './components/News';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

// 全局 ScrollTrigger 配置
ScrollTrigger.config({
  // 啟用慣性效果
  inertia: 0.85,
  // 限制回調頻率提高性能
  limitCallbacks: true,
  // 忽略移動設備的resize事件
  ignoreMobileResize: true,
  // 自動修正滾動速度
  autoAdjustScroll: true
});

// 檢測iOS設備並應用額外優化
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

if (isIOS) {
  // iOS專用優化
  ScrollTrigger.normalizeScroll(true);

  // 防止滾動鎖定
  document.addEventListener('touchmove', (e) => {
    if (ScrollTrigger.isScrolling) {
      e.preventDefault();
    }
  }, { passive: false });
}

function App() {
  const wrapper = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    ScrollSmoother.create({
      wrapper: wrapper.current,
      content: content.current,
      smooth: 1.2,
      effects: true
    });
  }, []);

  return (
    // <ConfigProvider theme={theme}>
    <div ref={wrapper} id="smooth-wrapper">
      <div ref={content} id="smooth-content" className="app-container">
        <HeroBanner />
        {/*<TimeLine />*/}
        <Team />
        <Footer />
      </div>
    </div>
    // </ConfigProvider>
  );
}

export default App;