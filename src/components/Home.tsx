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
  // const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const icons = [
    { icon: <FaHtml5 color={"#E34F26"} />, name: "HTML5", rating: 5, comment: "Webページの基本構造" },
    { icon: <FaCss3Alt color={"#1572B6"} />, color: "", name: "CSS3", rating: 4, comment: "スタイリングが可能" },
    { icon: <FaJsSquare color={"#F7DF1E"} />, name: "JavaScript", rating: 3, comment: "動的な動作を実現" },
    { icon: <SiTypescript color={"#007ACC"} />, name: "TypeScript", rating: 1, comment: "型安全なJS" },
    { icon: <FaReact color={"#61DBFB"} />, name: "React", rating: 2, comment: "コンポーネントベースのUI" },
    { icon: <FaGithub color={"#333"} />, name: "GitHub", rating: 4, comment: "コード管理プラットフォーム" },
    { icon: <DiVisualstudio color={"#5C2D91"} />, name: "Visual Studio", rating: 4, comment: "強力なIDE" },
    { icon: <SiC color={"#A8B9CC"} />, name: "C", rating: 5, comment: "低レベルプログラミング" },
    { icon: <SiCplusplus color={"#00599C"} />, name: "C++", rating: 5, comment: "高性能プログラミング" },
    { icon: <SiProgate color={"#F5A623"} />, name: "Progate", rating: 4, comment: "初心者向け学習サイト" },
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
  const getRandomDirection = () => {
    return directions[Math.floor(Math.random() * directions.length)];
  };

  // アニメーション開始
  const animateIcon = () => {
    const iconElement = iconRefs.current[currentIndex];

    if (isAnimating || !iconElement) return; // アニメーション中の場合はスキップ

    const iconSize: number = 200; // アイコンサイズ（px単位）
    const randomDirection = getRandomDirection();
    const startX = randomDirection.startX;
    const startY = randomDirection.startY;
    const endX = randomDirection.endX;
    const endY = randomDirection.endY;
    const x1 = window.innerWidth * (startX / 100) - iconSize / 2;
    const y1 = window.innerHeight * (startY / 100) - iconSize / 2;
    const x2 = window.innerWidth * (endX / 100) - iconSize / 2;
    const y2 = window.innerHeight * (endY / 100) - iconSize / 2;

    // デバッグ用ログ
    console.log("Animation Debug Info:");
    console.log(`Position: ${startX}%, ${startY}%`);
    console.log(`Position: ${endX}%, ${endY}%`);

    const tl = gsap.timeline({  // timelineのインスタンスを変数に格納
      onStart: () => {
        setIsAnimating(true); // アニメーション中フラグを設定
        console.log(`Startindex: ${currentIndex} `);

        gsap.set(iconRefs.current[currentIndex], { x: x1, y: y1, rotation: 0, });
      },
      onComplete: () => {
        tl.kill(); // アニメーション完了時にtimelineのインスタンスを削除

        setIsAnimating(false); // アニメーション終了フラグを解除
        console.log(`Endindex: ${currentIndex}`);

        // const nextIndex = (currentIndex + 1) % icons.length; // 次のアイコンのインデックスを取得
        // gsap.set(iconRefs.current[nextIndex], { x: x1, y: y1, rotation: 0, });
        setCurrentIndex((currentIndex + 1) % icons.length); // 次のアイコンへ
      },
    }).to(
      iconElement,
      // { x: x1, y: y1, opacity: 1, rotation: 0, },
      { x: x2, y: y2, opacity: 1, rotation: 720, duration: 7, },
    );
  };

  // アニメーション中でない場合にアニメーションを開始
  // currentIndexが変更されるたびに実行
  useEffect(() => { if (!isAnimating) { animateIcon(); } }, [currentIndex]);

  return (

    <section id="home" className="home">
      <div className="icons">
        {icons.map((_, index) => (
          <div
            key={index}
            ref={(el) => (iconRefs.current[index] = el)}
            className={`icon ${index === currentIndex ? "visible" : "hidden"}`}
          >
            {icons[index].icon}
          </div>
        ))}
      </div>

      {/* <div className="coordinates">
        <p>X座標: {Math.floor(coordinates.x).toFixed(3)}</p>
        <p>Y座標: {Math.floor(coordinates.y).toFixed(3)}</p>
      </div> */}

      {currentIndex >= 0 && currentIndex < icons.length ? (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-icon">
              {icons[currentIndex].icon}
            </div>
            <div className="modal-name">{icons[currentIndex].name}</div>
            <div className="modal-rating">
              {"★".repeat(icons[currentIndex].rating)}
              {"☆".repeat(5 - icons[currentIndex].rating)}
            </div>
            <div className="modal-comment">{icons[currentIndex].comment}</div>
          </div>
        </div>
      ) : null}

    </section>
  );
};

export default Home;
