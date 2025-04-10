import { useEffect, useRef } from "react";
import { Canvas, FabricObject, Object } from "fabric";
import { enableGuideLines } from "../utils/guideline";
import { handleCopy, handlePaste } from "./handler/copyPasteHandler";
import { useChoiceStore } from "../../store/useChoiceStore";

/** 요소를 그리고 편집할 수 있는 캔버스 영역 */
export default function CanvasArea() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initCanvas = async () => {
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

      /** 캔버스 초기화 */
      const canvas = new Canvas(canvasRef.current, {
        backgroundColor: "white",
      });

      window.canvas = canvas;

      /** 요소 삭제 감지 */
      canvas.on("object:removed", (e) => {
        const removed = e.target;
        if (removed && "id" in removed && typeof removed.id === "string") {
          useChoiceStore.getState().removeChoiceByObjectId(removed.id);
        }
      });

      enableGuideLines({ canvas });

      /** sessionStorage에 저장된 요소 불러오기 */
      const saved = sessionStorage.getItem("questionData");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const json = parsed.elements;

          await canvas.loadFromJSON(json);
          canvas.renderAll();
        } catch (err) {
          console.error("불러오기 실패:", err);
        }
      }
    };

    initCanvas();

    /** 요소 복사/붙여넣기 (ctrl c / ctrl v) */
    const handleKeydown = async (e: KeyboardEvent) => {
      const canvas = window.canvas;
      if (!canvas) return;

      if (e.ctrlKey && e.code === "KeyC") {
        e.preventDefault();
        await handleCopy(canvas);
      }

      if (e.ctrlKey && e.code === "KeyV") {
        e.preventDefault();
        await handlePaste(canvas);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div className="bg-white border border-gray-300 shadow w-full h-[550px]">
      <canvas ref={canvasRef} width={800} height={550} />
    </div>
  );
}
