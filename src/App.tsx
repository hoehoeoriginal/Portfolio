import './App.css'
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

// react-iconsからアイコンをインポート
import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaGithub } from 'react-icons/fa';
import { SiC, SiCplusplus, SiTypescript } from 'react-icons/si';
import { DiVisualstudio } from 'react-icons/di';

const App = () => {
  // 各画像要素を参照するための配列
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]); // 各アイコンの参照用配列

  // 使用するアイコンとその色
  const icons = [
    { icon: <FaReact />, color: 'react-color' }, // React
    { icon: <FaJsSquare />, color: 'js-color' }, // JavaScript
    { icon: <FaHtml5 />, color: 'html-color' }, // HTML5
    { icon: <FaCss3Alt />, color: 'css-color' }, // CSS3
    { icon: <SiC />, color: 'c-color' }, // C
    { icon: <SiCplusplus />, color: 'cpp-color' }, // C++
    { icon: <DiVisualstudio />, color: 'vb-color' }, // Visual Basic
    { icon: <FaGithub />, color: 'github-color' }, // GitHub
    { icon: <SiTypescript />, color: 'ts-color' }, // TypeScript
  ];

  useEffect(() => {
    // 初期位置（右上・右中央・右下）を自動計算
    const initialPositions = [
      { group: 0, x: '100vw', y: '10vh' }, // 右上
      { group: 0, x: '100vw', y: '10vh' },
      { group: 0, x: '100vw', y: '10vh' },
      { group: 1, x: '100vw', y: '50vh' }, // 右中央
      { group: 1, x: '100vw', y: '50vh' },
      { group: 1, x: '100vw', y: '50vh' },
      { group: 2, x: '100vw', y: '80vh' }, // 右下
      { group: 2, x: '100vw', y: '80vh' },
      { group: 2, x: '100vw', y: '80vh' },
    ];

    // animateIcons1の定義（右上・右中央・右下に配置して左側へ移動）
    const animateIcons1 = () => {
      return new Promise<void>((resolve) => {
        const timeline = gsap.timeline({ onComplete: resolve }); // アニメーション終了後にresolve

        // アイコンの初期配置
        iconRefs.current.forEach((icon, index) => {
          if (icon) {
            gsap.set(icon, {
              x: initialPositions[index].x,
              y: initialPositions[index].y,
            });
          }
        });

        // 3グループのアイコンを同時に左側へ移動
        const groupDelay = 0.5; // グループごとの遅延
        for (let i = 0; i < 3; i++) {
          const groupIcons = iconRefs.current.slice(i * 3, i * 3 + 3).filter(Boolean); // 各グループのアイコン
          timeline.to(groupIcons,
            {
              x: '-10vw', // 左側へ移動
              duration: 2,
              ease: 'power2.inOut',
              stagger: 0.2, // グループ内で少しずつずれる
            },
            i * groupDelay // グループごとの遅延時間
          );
        }
      });
    };

    // animateIcons2の定義（グリッドに降りてきて着地）
    const animateIcons2 = () => {
      return new Promise<void>((resolve) => {
        // グリッド配置の計算
        const positions = iconRefs.current.map((_, index) => {
          const col = index % 3; // 列番号
          const row = Math.floor(index / 3); // 行番号
          return {
            x: col * (100 / 3) + 15, // 列の位置 (余白15%)
            y: row * (100 / 3) + 15, // 行の位置 (余白15%)
          };
        });

        gsap.fromTo(
          iconRefs.current.filter(Boolean),
          { y: '-100vh', opacity: 0 },
          {
            x: (i) => `${positions[i].x}vw`,
            y: (i) => `${positions[i].y}vh`,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            stagger: 0.2,
            onComplete: resolve,
          }
        );
      });
    };

    // animateIcons3の定義(ふわふわと浮くアニメーション)
    const animateIcons3 = () => {
      gsap.to(iconRefs.current.filter(Boolean), {
        y: '+=20', // 上下20px移動
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1, // 無限ループ
        yoyo: true, // 往復アニメーション
      });
    };

    // アニメーションを順番に実行
    const startAnimation = async () => {
      await animateIcons1();
      await animateIcons2();
      animateIcons3();
    };

    startAnimation();

    return () => {
      gsap.killTweensOf(iconRefs.current);  // アニメーション停止
    };
  }, []);

  return (
    <div className='app-container'>
      {icons.map((iconData, index) => (
        <div
          ref={(el) => {
            if (el) iconRefs.current[index] = el; // 各要素をiconRefsに登録
          }}
          className='icon-wrapper'
          key={index}
        >
          <div className={`icon ${iconData.color}`}>{iconData.icon}</div>
          <div className='wave'></div> {/*水面画像*/}
        </div>
      ))}
    </div>
  );
};

export default App;
