import { useEffect, useState } from "react";
import { Object as FabricObjectType } from "fabric";
import { getCanvas } from "../utils/canvas";

/** 현재 선택된 요소를 추적하는 훅 */
export const useSelectedCanvasObject = () => {
  const [selected, setSelected] = useState<FabricObjectType | null>(null);

  useEffect(() => {
    const canvas = getCanvas();

    const handleUpdate = () => {
      const active = canvas.getActiveObject();
      const activeObjs = canvas.getActiveObjects();
      if (!active || activeObjs.length > 1) setSelected(null);
      else setSelected(active);
    };

    canvas.on("selection:created", handleUpdate);
    canvas.on("selection:updated", handleUpdate);
    canvas.on("selection:cleared", () => setSelected(null));
    canvas.on("mouse:up", handleUpdate);

    return () => {
      canvas.off("selection:created", handleUpdate);
      canvas.off("selection:updated", handleUpdate);
      canvas.off("selection:cleared");
      canvas.off("mouse:up", handleUpdate);
    };
  }, []);

  return selected;
};
