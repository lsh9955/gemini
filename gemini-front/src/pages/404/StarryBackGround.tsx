import React, { useEffect, useRef, ReactNode } from "react";
import Star from "./Star";

// styled-componets
import { Space } from "../404/NotFoundPageStyle";

interface StarryBackgroundProps {
  children?: ReactNode;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const newStars: Star[] = Array.from({ length: 700 }, () => {
      const x = Math.round(Math.random() * window.innerWidth);
      const y = Math.round(Math.random() * window.innerHeight);
      const length = 1 + Math.random() * 2;
      const opacity = Math.random();
      return new Star(x, y, length, opacity);
    });

    const intervalId = setInterval(() => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      newStars.forEach((star) => star.draw(context));
    }, 1000 / 50); // 50 FPS

    return () => {
      clearInterval(intervalId); // Stop the interval when the component is unmounted
    };
  }, []); // Empty dependency array, so this effect runs once on mount

  return (
    <Space>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      {children}
    </Space>
  );
};

export default StarryBackground;
