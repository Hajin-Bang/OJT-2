import { useEffect, useState } from "react";
import BasicToolGroup from "./groups/BasicToolGroup";
import ShapeToolGroup from "./groups/ShapeToolGroup";
import TextToolGroup from "./groups/TextToolGroup";

/**
 * 캔버스에서 선택된 도형의 타입을 감지하여
 * 그에 맞는 툴 그룹을 표시
 */
export default function Toolbar() {
  const [objectType, setObjectType] = useState<"shape" | "text" | null>(null);

  useEffect(() => {
    const canvas = window.canvas;
    if (!canvas || canvas.disposed) return;

    /** 도형 선택 시 실행되는 핸들러 */
    const handleSelection = () => {
      const active = canvas.getActiveObject();

      if (!active) {
        setObjectType(null);
      } else if (["rect", "circle", "line"].includes(active.type)) {
        setObjectType("shape");
      } else if (active.type === "textbox") {
        setObjectType("text");
      } else {
        setObjectType(null);
      }
    };

    /** 도형 선택 관련 이벤트 바인딩 */
    canvas.on("selection:created", handleSelection);
    canvas.on("selection:updated", handleSelection);
    canvas.on("selection:cleared", () => setObjectType(null));

    handleSelection();

    return () => {
      canvas.off("selection:created", handleSelection);
      canvas.off("selection:updated", handleSelection);
      canvas.off("selection:cleared");
    };
  }, []);

  return (
    <div className="flex items-center gap-3 h-full">
      <BasicToolGroup />
      {objectType && (
        <>
          <div className="w-px h-6 bg-gray-300 mx-2" />
          {objectType === "shape" && <ShapeToolGroup />}
          {objectType === "text" && <TextToolGroup />}
        </>
      )}
    </div>
  );
}
