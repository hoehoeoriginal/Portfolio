import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaGithub,
} from "react-icons/fa";
import { SiTypescript, SiC, SiCplusplus, SiProgate } from "react-icons/si"; // プロゲートアイコン追加
import { DiVisualstudio } from "react-icons/di";
import "../css/Home.css";

const Home: React.FC = () => {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]); // 各アイコンのDOMを参照
  const [currentIndex, setCurrentIndex] = useState(0); // 現在アニメーション中のアイコンを追跡
  const [isAnimating, setIsAnimating] = useState(false); // アニメーション中かどうかを管理

  const icons = [
    { icon: <FaHtml5 />, color: "#E34F26", name: "HTML5" },
    { icon: <FaCss3Alt />, color: "#1572B6", name: "CSS3" },
    { icon: <FaJsSquare />, color: "#F7DF1E", name: "JavaScript" },
    { icon: <SiTypescript />, color: "#007ACC", name: "TypeScript" },
    { icon: <FaReact />, color: "#61DBFB", name: "React" },
    { icon: <FaGithub />, color: "#333", name: "GitHub" },
    { icon: <DiVisualstudio />, color: "#5C2D91", name: "Visual Studio" },
    { icon: <SiC />, color: "#A8B9CC", name: "C" },
    { icon: <SiCplusplus />, color: "#00599C", name: "C++" },
    { icon: <SiProgate />, color: "#F5A623", name: "Progate" }, // プロゲートアイコン追加
  ];

  // ランダムに8方向の移動を設定
  const directions = [
    { startX: -100, startY: -100, endX: 100, endY: 100 }, // 北西-南東 North-West to South-East
    { startX: 0, startY: -100, endX: 0, endY: 100 },      // 北  -南   North to South
    { startX: 100, startY: -100, endX: -100, endY: 100 }, // 北東-南西 North-East to South-West
    { startX: 100, startY: 0, endX: -100, endY: 0 },      // 東  -西   East to West
    { startX: 100, startY: 100, endX: -100, endY: -100 }, // 南東-北西 South-East to North-West
    { startX: 0, startY: 100, endX: 0, endY: -100 },      // 南  -北   South to North
    { startX: -100, startY: 100, endX: 100, endY: -100 }, // 南西-北東 South-West to North-East
    { startX: -100, startY: 0, endX: 100, endY: 0 },      // 西  -東   West to East
  ];

  // アニメーション開始
  const animateIcon = (index: number) => {
    if (!iconRefs.current[index] || isAnimating) return; // 他のアニメーション中はスキップ

    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const iconElement = iconRefs.current[index];

    setIsAnimating(true); // アニメーション中フラグを設定

    gsap.fromTo(
      iconElement,
      {
        x: `${randomDirection.startX}vw`, // ランダムな方向に移動
        y: `${randomDirection.startY}vh`, // ランダムな方向に移動
        opacity: 1,
      },
      {
        x: `${randomDirection.endX}vw`, // ランダムな方向に移動
        y: `${randomDirection.endY}vh`, // ランダムな方向に移動
        opacity: 1,
        duration: 5,
        onComplete: () => {
          // 次のアイコンをアニメーション
          setIsAnimating(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % icons.length); // 次のアイコンに移動
        },
      }
    );
  };

  useEffect(() => {
    if (!isAnimating) {
      animateIcon(currentIndex); // アニメーションを開始
    }
  }, [currentIndex, isAnimating]); // currentIndexが変化するたびに実行

  return (
    <section id="home" className="home">
      <h2>Home</h2>
      <div className="icons">
        {icons.map((icon, index) => (
          <div
            key={index}
            ref={(el) => (iconRefs.current[index] = el)}
            className="icon"
            style={{ color: icon.color }}
            onMouseEnter={() => {
              gsap.globalTimeline.pause; // ホバー時に停止
            }}
            onMouseLeave={() => {
              gsap.globalTimeline.resume(); // ホバー解除時に再開
            }}
          >
            {icon.icon}
            <div className="popup">{icon.name}</div> {/* ポップアップの表示 */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
