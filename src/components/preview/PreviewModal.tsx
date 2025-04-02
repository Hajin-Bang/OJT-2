import { useEffect, useRef } from "react";
import { Canvas } from "fabric";

interface PreviewModalProps {
  onClose: () => void;
}

let previewCanvas: Canvas | null = null;

/** Preview 버튼을 눌렀을 때 나타나는 모달 */
export default function PreviewModal({ onClose }: PreviewModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("questionData");
    if (!saved || !canvasRef.current) return;

    try {
      if (previewCanvas) {
        previewCanvas.dispose();
        previewCanvas = null;
      }

      const canvasElement = canvasRef.current;
      canvasElement.width = 800;
      canvasElement.height = 550;

      /** 새 캔버스 생성 */
      const canvas = new Canvas(canvasElement, {
        backgroundColor: "white",
        selection: false,
      });

      previewCanvas = canvas;
      const parsed = JSON.parse(saved);

      /** 저장된 JSON 데이터를 로드 */
      canvas.loadFromJSON(parsed.elements, () => {
        canvas.getObjects().forEach((obj) => {
          obj.selectable = false;
          obj.evented = false;
          obj.hasControls = false;
          obj.lockMovementX = true;
          obj.lockMovementY = true;
        });

        /** 즉시 렌더링 요청 */
        canvas.requestRenderAll();
      });
    } catch (err) {
      console.error("오류:", err);
    }

    return () => {
      if (previewCanvas) {
        previewCanvas.dispose();
        previewCanvas = null;
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center">
      <div className="relative bg-white w-[900px] max-w-full rounded-xl shadow-lg p-6 pb-20">
        <h2 className="text-xl font-bold text-green-700 mb-4">Preview</h2>
        <div className="border border-gray-300">
          <canvas ref={canvasRef} width={800} height={550} />
        </div>
        <button
          onClick={onClose}
          className="absolute bottom-6 right-6 px-4 py-2 border border-gray-100 hover:bg-gray-200 rounded cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
