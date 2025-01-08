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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const icons = [
    { icon: <FaHtml5 />, color: "#E34F26", name: "HTML5", rating: 5, comment: "Webページの基本構造" },
    { icon: <FaCss3Alt />, color: "#1572B6", name: "CSS3", rating: 4, comment: "スタイリングが可能" },
    { icon: <FaJsSquare />, color: "#F7DF1E", name: "JavaScript", rating: 3, comment: "動的な動作を実現" },
    { icon: <SiTypescript />, color: "#007ACC", name: "TypeScript", rating: 1, comment: "型安全なJS" },
    { icon: <FaReact />, color: "#61DBFB", name: "React", rating: 2, comment: "コンポーネントベースのUI" },
    { icon: <FaGithub />, color: "#333", name: "GitHub", rating: 4, comment: "コード管理プラットフォーム" },
    { icon: <DiVisualstudio />, color: "#5C2D91", name: "Visual Studio", rating: 4, comment: "強力なIDE" },
    { icon: <SiC />, color: "#A8B9CC", name: "C", rating: 5, comment: "低レベルプログラミング" },
    { icon: <SiCplusplus />, color: "#00599C", name: "C++", rating: 5, comment: "高性能プログラミング" },
    { icon: <SiProgate />, color: "#F5A623", name: "Progate", rating: 4, comment: "初心者向け学習サイト" },
  ];

  // ランダムに8方向の移動を設定
  const directions = [
    { startX: 0, startY: 0, endX: 100, endY: 100 }, // 北西-南東 North-West to South-East
    { startX: 50, startY: 0, endX: 50, endY: 100 }, // 北  -南   North to South
    { startX: 100, startY: 0, endX: 0, endY: 100 }, // 北東-南西 North-East to South-West
    { startX: 100, startY: 50, endX: 0, endY: 50 }, // 東  -西   East to West
    { startX: 100, startY: 100, endX: 0, endY: 0 }, // 南東-北西 South-East to North-West
    { startX: 50, startY: 100, endX: 50, endY: 0 }, // 南  -北   South to North
    { startX: 0, startY: 100, endX: 100, endY: 0 }, // 南西-北東 South-West to North-East
    { startX: 0, startY: 50, endX: 100, endY: 50 }, // 西  -東   West to East
  ];

  // アニメーション開始
  const animateIcon = () => {
    const iconElement = iconRefs.current[currentIndex];

    if (isAnimating || !iconElement) return; // アニメーション中の場合はスキップ

    // const iconSize: number = 200; // アイコンサイズ（px単位）
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];

    setIsAnimating(true); // アニメーション中フラグを設定

    const startX = randomDirection.startX;
    const startY = randomDirection.startY;
    const endX = randomDirection.endX;
    const endY = randomDirection.endY;

    // デバッグ用ログ
    console.log("Animation Debug Info:");
    console.log(`Start Position: ${window.innerWidth * startX / 100}, ${window.innerHeight * startY / 100}`);
    // console.log(`End Position: (${endX}vw, ${endY}vh)`);

    gsap.timeline({
      onComplete: () => {
        setIsAnimating(false); // アニメーション終了フラグを解除
        setCurrentIndex((prev) => (prev + 1) % icons.length); // 次のアイコンへ
      },
    }).fromTo(
      iconElement,
      {
        x: window.innerWidth * (startX / 100),
        y: window.innerHeight * (startY / 100),
        // x: window.innerWidth * (startX / 100) - iconSize / 2,
        // y: window.innerHeight * (startY / 100) - iconSize / 2,
        opacity: 1,
      },
      {
        x: window.innerWidth * (endX / 100),
        y: window.innerHeight * (endY / 100),
        // x: window.innerWidth * (endX / 100) - iconSize / 2,
        // y: window.innerHeight * (endY / 100) - iconSize / 2,
        opacity: 1,
        duration: 5,
      }
    );
  };

  useEffect(() => {
    if (hoveredIndex === null && !isAnimating) {
      animateIcon(); // ホバー中でなければアニメーションを実行
    }

    // 現在のアイコンの色を設定
    iconRefs.current.forEach((icon, index) => {
      if (icon) {
        const color = icon.getAttribute("data-color");
        if (index === currentIndex) {
          icon.style.color = color || "transparent";
        } else {
          icon.style.color = "transparent";
        }
      }
    });

    // モーダルのアイコンの色を設定
    const modalIcon = document.querySelector(".modal-icon") as HTMLDivElement | null;
    if (modalIcon && hoveredIndex !== null) {
      const color = modalIcon.getAttribute("data-color");
      modalIcon.style.color = color || "transparent";
    }
  }, [currentIndex, hoveredIndex]); // currentIndex または hoveredIndex が変更されるたびに実行

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
      <div className="icons">
        {icons.map((icon, index) => (
          <div
            key={index}
            ref={(el) => (iconRefs.current[index] = el)}
            className={`icon ${index === currentIndex ? "visible" : "hidden"}`}
            data-color={icons[index].color} // データ属性に色を格納
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
          >
            {icon.icon}
          </div>
        ))}
      </div>

      {hoveredIndex !== null && hoveredIndex < icons.length && (
        <div className="modal">
          <div className="modal-content">
            <div
              className="modal-icon $(index === hoveredIndex ? 'visible' : 'hidden')"
              data-color={icons[hoveredIndex].color} // データ属性に色を格納
            >
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
