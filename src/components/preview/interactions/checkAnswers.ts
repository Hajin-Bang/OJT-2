import { Canvas, Group, Rect } from "fabric";
import { Choice } from "../../../types/choice";

/** 선택지 채점 처리 함수 */
export const checkAnswers = (
  canvas: Canvas,
  choices: Choice[],
  selectedIds: string[],
  onWrong: () => void,
  showCorrect: boolean
) => {
  let wasWrong = false;

  choices.forEach((choice) => {
    const obj = canvas
      .getObjects()
      .find(
        (o): o is Group & { id: string } =>
          "id" in o && o.id === choice.objectId
      );
    if (!obj) return;

    const rect = obj.getObjects().find((c): c is Rect => c.type === "rect");
    if (!rect) return;

    const isCorrect = choice.isAnswer;
    const isSelected = selectedIds.includes(choice.objectId);

    if (isCorrect && isSelected) {
      rect.set({ stroke: "#33E651", strokeWidth: 3 });
    } else if (!isCorrect && isSelected) {
      rect.set({ stroke: "#FF4D4F", strokeWidth: 3 });
      wasWrong = true;
    } else if (isCorrect && !isSelected && showCorrect) {
      rect.set({ stroke: "#33E651", strokeWidth: 3 });
    }
  });

  if (wasWrong) {
    onWrong();
  }

  canvas.requestRenderAll();
};
