import { useEffect } from "react";
import { getCanvas } from "../utils/canvas";
import { captureSingleObject } from "../utils/capture";
import { Choice } from "../../types/choice";

interface UpdatedChoiceImage {
  id: string;
  imageUrl: string;
}

/**
 * 캔버스 객체 변경 시 Choice 이미지 자동 업데이트
 * 회전/이동/크기 조절 중에도 실시간 반영
 */
export const useChoiceImageUpdater = (
  choices: Choice[],
  onUpdate: (updated: UpdatedChoiceImage[]) => void
) => {
  useEffect(() => {
    const canvas = getCanvas();

    /** 캔버스 객체 변경 시 이미지 업데이트 */
    const handleModified = () => {
      const updated: UpdatedChoiceImage[] = [];

      choices.forEach((choice) => {
        const obj = canvas.getObjects().find((o) => o.id === choice.objectId);
        if (obj) {
          const imageUrl = captureSingleObject(canvas, obj);
          updated.push({ id: choice.id, imageUrl });
        }
      });

      if (updated.length > 0) {
        onUpdate(updated);
      }
    };

    const events = [
      "object:moving",
      "object:scaling",
      "object:rotating",
      "object:modified",
    ] as const;

    /** 모든 이벤트에 handleModified 연결 */
    events.forEach((evt) => canvas.on(evt, handleModified));

    return () => {
      events.forEach((evt) => canvas.off(evt, handleModified));
    };
  }, [choices, onUpdate]);
};
