import { useEffect, useState } from "react";
import BasicToolGroup from "./groups/BasicToolGroup";
import ShapeToolGroup from "./groups/ShapeToolGroup";
import TextToolGroup from "./groups/TextToolGroup";
import { Group } from "fabric";
import TextGroupToolGroup from "./groups/TextGroupToolGroup";

type ObjectType = "shape" | "text" | "textGroup" | null;

/**
 * 캔버스에서 선택된 도형의 타입을 감지하여
 * 그에 맞는 툴 그룹을 표시
 */
export default function Toolbar({ onPreview }: { onPreview: () => void }) {
  const [objectType, setObjectType] = useState<ObjectType>(null);

  useEffect(() => {
    const canvas = window.canvas;
    if (!canvas || canvas.disposed) return;

    /** 선택된 객체에 따라 objectType을 판단 */
    const handleSelection = () => {
      const selected = canvas.getActiveObjects();

      if (selected.length === 0) {
        setObjectType(null);
      } else if (selected.length === 1) {
        const active = selected[0];
        if (["rect", "circle", "line"].includes(active.type)) {
          setObjectType("shape");
        } else if (active.type === "textbox") {
          setObjectType("text");
        } else if (active.type === "group") {
        /** 그룹 선택 시 내부에 텍스트 포함 여부 확인 */
          const group = active as Group;
          const hasTextbox = group
            .getObjects()
            .some((obj) => obj.type === "textbox");
          if (hasTextbox) {
            setObjectType("textGroup");
          } else {
            setObjectType(null);
          }
        } else {
          setObjectType(null);
        }
      } else {
        setObjectType(null);
      }
    };

    /** selection 관련 이벤트 바인딩 */
    canvas.on("selection:created", handleSelection);
    canvas.on("selection:updated", handleSelection);
    canvas.on("selection:cleared", () => setObjectType(null));
    canvas.on("mouse:up", handleSelection);

    handleSelection();

    return () => {
      canvas.off("selection:created", handleSelection);
      canvas.off("selection:updated", handleSelection);
      canvas.off("selection:cleared");
      canvas.off("mouse:up", handleSelection);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 h-full">
      <BasicToolGroup onPreview={onPreview} />
      {objectType && (
        <>
          <div className="w-px h-6 bg-gray-300 mx-2" />
          {objectType === "shape" && <ShapeToolGroup />}
          {objectType === "text" && <TextToolGroup />}
          {objectType === "textGroup" && <TextGroupToolGroup />}
        </>
      )}
    </div>
  );
}
