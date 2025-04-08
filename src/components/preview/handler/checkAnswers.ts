import { Canvas, Group, Rect } from "fabric";
import { Choice } from "../../../types/choice";
import { createFeedbackIcon } from "../FeedbackIcon";

/** 선택지 채점 처리 함수 + 피드백 아이콘 표시 */
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

    /** 아이콘 위치 계산 */
    const bounds = obj.getBoundingRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    if (isCorrect && isSelected) {
      rect.set({ stroke: "#33E651", strokeWidth: 3 });
      canvas.add(createFeedbackIcon(true, centerX, centerY));
    } else if (!isCorrect && isSelected) {
      rect.set({ stroke: "#FF4D4F", strokeWidth: 3 });
      canvas.add(createFeedbackIcon(false, centerX, centerY));
      wasWrong = true;
    } else if (isCorrect && !isSelected && showCorrect) {
      rect.set({ stroke: "#33E651", strokeWidth: 3 });
      canvas.add(createFeedbackIcon(true, centerX, centerY));
    }
  });

  if (wasWrong) onWrong();
  canvas.requestRenderAll();
};
