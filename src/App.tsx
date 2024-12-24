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

    // // 初期位置（右上・右中央・右下）を自動計算
    // const initialPositions = [
    //   { group: 0, x: '100vw', y: '10vh' }, // 右上
    //   { group: 0, x: '100vw', y: '10vh' },
    //   { group: 0, x: '100vw', y: '10vh' },
    //   { group: 1, x: '100vw', y: '50vh' }, // 右中央
    //   { group: 1, x: '100vw', y: '50vh' },
    //   { group: 1, x: '100vw', y: '50vh' },
    //   { group: 2, x: '100vw', y: '80vh' }, // 右下
    //   { group: 2, x: '100vw', y: '80vh' },
    //   { group: 2, x: '100vw', y: '80vh' },
    // ];

    // 星とアイコンを一緒に降らせるアニメーション
    const animateStarsAndIcons = () => {
      return new Promise<void>((resolve) => {
        const timeline = gsap.timeline({ onComplete: resolve }); // アニメーション終了後にresolve

        // グリッドの配置を計算
        const gridPositions = icons.map((_, index) => {
          const col = index % 3; // 列
          const row = Math.floor(index / 3); // 行
          return {
            x: col * (100 / 3) + 15, // 横の位置 (15% 余白)
            y: row * (100 / 3) + 15, // 縦の位置 (15% 余白)
          };
        });

        // アイコンの初期配置
        iconRefs.current.forEach((icon, index) => {
          if (icon) {
            timeline.fromTo(
              icon,
              {
                x: `${Math.random() * 100}vh`, // ランダムな横位置から降下
                y: `${-Math.random() * 100}vh`, // ランダムな高さから降下
                opacity: 0,
              },
              {
                x: `${gridPositions[index].x}vw`, // ランダムな着地位置
                y: `${gridPositions[index].y}vw`, // ランダムな着地位置
                opacity: 1,
                duration: 3,
                ease: 'power3.out',
                onComplete: () => {
                  // 到着後、ふわっと浮く演出
                  gsap.to(icon, {
                    y: '+=10',
                    duration: 2,
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                  });
                },
              }
            );
          }
        });
      });
    };


    // アニメーションを順番に実行
    const startAnimation = async () => {
      await animateStarsAndIcons();
    };

    startAnimation();

    return () => {
      gsap.killTweensOf(iconRefs.current);  // アニメーション停止
    };
  }, []);

  // TSX
  return (
    <div
      className='app-container'
      style={{
        backgroundImage: "url('/Milkyway.jpg')", // 背景画像の指定
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        overflow: 'hidden', // スクロールを防ぐ
      }}
    >
      {icons.map((iconData, index) => (
        <div
          ref={(el) => {
            if (el) iconRefs.current[index] = el; // 各要素をiconRefsに登録
          }}
          className='icon-wrapper'
          key={index}
          style={{
            position: 'absolute',
            backgroundImage: "url('/ShootingStar.png')", // 星画像を背景に指定
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '100px',
            height: '100px',
          }}
        >
          <div className={`icon ${iconData.color}`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)', // 星の中心にアイコンを配置
            }}
          >
            {iconData.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
