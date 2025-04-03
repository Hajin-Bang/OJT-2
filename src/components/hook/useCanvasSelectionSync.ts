import { useEffect } from "react";
import { getCanvas } from "../utils/canvas";
import { useChoiceSelectionStore } from "../../store/useChoiceSelectionStore";

/** 캔버스에서 선택된 객체의 ID를 Zustand 전역 상태로 동기화하는 훅 */
export const useCanvasSelectionSync = () => {
  const setSelectedChoiceId = useChoiceSelectionStore(
    (s) => s.setSelectedChoiceId
  );

  useEffect(() => {
    const canvas = getCanvas();

    const handleSelection = () => {
      const active = canvas.getActiveObject();
      /** 객체가 선택되면 해당 객체의 id를 전역 상태로 설정 */
      if (active?.id) {
        setSelectedChoiceId(active.id);
      } else {
        setSelectedChoiceId(null);
      }
    };

    canvas.on("selection:created", handleSelection);
    canvas.on("selection:updated", handleSelection);

    /** 선택 해제 시 초기화 */
    canvas.on("selection:cleared", () => setSelectedChoiceId(null));

    return () => {
      canvas.off("selection:created", handleSelection);
      canvas.off("selection:updated", handleSelection);
      canvas.off("selection:cleared", () => setSelectedChoiceId(null));
    };
  }, [setSelectedChoiceId]);
};
