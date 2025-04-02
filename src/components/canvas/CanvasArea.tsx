import { useEffect, useRef } from "react";
import { Canvas, FabricObject, Object } from "fabric";

/** 요소를 그리고 편집할 수 있는 캔버스 영역 */
export default function CanvasArea() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || window.canvas) return;

    /** 객체를 JSON으로 변환할 때 포함할 속성 지정 */
    FabricObject.prototype.toObject = (function (toObject) {
      return function (this: Object, propertiesToInclude?: string[]) {
        return toObject.call(this, [
          "id",
          "left",
          "top",
          "width",
          "height",
          "text",
          "type",
          "radius",
          "fill",
          "stroke",
          ...(propertiesToInclude || []),
        ]);
      };
    })(FabricObject.prototype.toObject);

    /**
     * 캔버스 초기화
     * 전역 window.canvas에 저장해 외부 접근이 가능하게 설정
     */
    const canvas = new Canvas(canvasRef.current, {
      backgroundColor: "white",
    });

    window.canvas = canvas;
  }, []);

  return (
    <div className="bg-white border border-gray-300 shadow w-full h-[550px]">
      <canvas ref={canvasRef} width={800} height={550} />
    </div>
  );
}
