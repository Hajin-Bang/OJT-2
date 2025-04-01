/** 캔버스 영역 */
import { useEffect, useRef } from "react";
import { Canvas } from "fabric";

export default function CanvasArea() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      backgroundColor: "white",
    });

    window.canvas = canvas;

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div className="bg-white border border-gray-300 shadow w-full h-[550px]">
      <canvas ref={canvasRef} width={800} height={550} />
    </div>
  );
}
