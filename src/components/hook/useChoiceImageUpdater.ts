import { useEffect } from "react";
import { getCanvas } from "../utils/canvas";
import { Choice } from "../../types/choice";
import { captureSingleObject } from "../utils/capture";

/** 선택된 객체의 이미지 URL을 캡처하고 Choice 업데이트 */
export function useChoiceImageUpdater(
  choices: Choice[],
  setChoices: React.Dispatch<React.SetStateAction<Choice[]>>
) {
  useEffect(() => {
    const canvas = getCanvas();

    const updateChoiceImage = () => {
      const active = canvas.getActiveObject();
      if (!active?.id) return;

      const dataUrl = captureSingleObject(canvas, active);

      setChoices((prev) =>
        prev.map((c) =>
          c.objectId === active.id ? { ...c, imageUrl: dataUrl } : c
        )
      );
    };

    canvas.on("object:modified", updateChoiceImage);
    canvas.on("object:scaling", updateChoiceImage);
    canvas.on("object:moving", updateChoiceImage);
    canvas.on("object:rotating", updateChoiceImage);

    return () => {
      canvas.off("object:modified", updateChoiceImage);
      canvas.off("object:scaling", updateChoiceImage);
      canvas.off("object:moving", updateChoiceImage);
      canvas.off("object:rotating", updateChoiceImage);
    };
  }, [choices, setChoices]);
}
