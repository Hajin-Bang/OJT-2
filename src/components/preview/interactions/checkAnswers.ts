import { Canvas, Group, Rect } from "fabric";
import { Choice } from "../../../types/choice";

/** 선택지 채점 처리 함수 */
export const checkAnswers = (
  canvas: Canvas,
  choices: Choice[],
  selectedIds: string[]
) => {
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
      rect.set("stroke", "#33E651");
    } else if (!isCorrect && isSelected) {
      rect.set("stroke", "#FF4D4F");
    } else if (isCorrect && !isSelected) {
      rect.set({ stroke: "#33E651", strokeWidth: 3 });
    }
  });

  canvas.requestRenderAll();
};
