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
  const animationRefs = useRef<(gsap.core.Tween | null)[]>([]); // 各アイコンのアニメーションを保持
  const [currentIndex, setCurrentIndex] = useState(0); // 現在アニメーション中のアイコンを追跡
  const [isAnimating, setIsAnimating] = useState(false); // アニメーション中かどうかを管理
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const icons = [
    { icon: <FaHtml5 />, color: "#E34F26", name: "HTML5", rating: 5, comment: "Webページの基本構造" },
    { icon: <FaCss3Alt />, color: "#1572B6", name: "CSS3", rating: 4, comment: "スタイリングが可能" },
    { icon: <FaJsSquare />, color: "#F7DF1E", name: "JavaScript", rating: 5, comment: "動的な動作を実現" },
    { icon: <SiTypescript />, color: "#007ACC", name: "TypeScript", rating: 5, comment: "型安全なJS" },
    { icon: <FaReact />, color: "#61DBFB", name: "React", rating: 5, comment: "コンポーネントベースのUI" },
    { icon: <FaGithub />, color: "#333", name: "GitHub", rating: 4, comment: "コード管理プラットフォーム" },
    { icon: <DiVisualstudio />, color: "#5C2D91", name: "Visual Studio", rating: 4, comment: "強力なIDE" },
    { icon: <SiC />, color: "#A8B9CC", name: "C", rating: 3, comment: "低レベルプログラミング" },
    { icon: <SiCplusplus />, color: "#00599C", name: "C++", rating: 4, comment: "高性能プログラミング" },
    { icon: <SiProgate />, color: "#F5A623", name: "Progate", rating: 4, comment: "初心者向け学習サイト" },
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
  const animateIcon = () => {
    const iconElement = iconRefs.current[currentIndex];
    if (isAnimating || !iconElement) return; // 他のアニメーション中はスキップ

    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];

    setIsAnimating(true); // アニメーション中フラグを設定

    // 既存のアニメーションを停止
    // animationRefs.current[index]?.kill();

    // 新しいアニメーションを開始
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
        ease: "linear",
        onComplete: () => {
          setIsAnimating(false); // アニメーション終了フラグを解除
          setCurrentIndex((prev) => (prev + 1) % icons.length); // 次のアイコンに進む
        },
      }
    );
  };

  useEffect(() => {
    if (hoveredIndex === null && !isAnimating) {
      animateIcon(); // ホバー中でなければアニメーションを実行
    }
  }, [currentIndex, hoveredIndex, isAnimating]); // currentIndexが変化するたびに実行

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    gsap.globalTimeline.pause(); // ホバー時に全アニメーションを停止
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    gsap.globalTimeline.resume(); // ホバー解除時にアニメーションを再開
  };

  return (
    <section id="home" className="home">
      <h2>Home</h2>
      <div className="icons">
        {icons.map((icon, index) => (
          <div
            key={index}
            ref={(el) => (iconRefs.current[index] = el)}
            className={`icon ${index === currentIndex ? "visible" : "hidden"}`}
            style={{
              color: index === currentIndex ? icons[index].color : "transparent",
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
          >
            {index === currentIndex && icons[index].icon}
          </div>
        ))}
      </div>

      {hoveredIndex !== null && hoveredIndex >= 0 && hoveredIndex < icons.length && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-icon"
              style={{ color: icons[hoveredIndex].color }}>
              {icons[hoveredIndex].icon}
            </div>
            <div className="modal-rating">
              {"★".repeat(icons[hoveredIndex].rating)}
              {"☆".repeat(5 - icons[hoveredIndex].rating)}
            </div>
            <div className="modal-comment">
              {icons[hoveredIndex].comment}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
