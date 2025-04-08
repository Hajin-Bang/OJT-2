import { Canvas, Group, Rect } from "fabric";
import { Choice } from "../../../types/choice";
import { createFeedbackIcon } from "../FeedbackIcon";

/** 선택지 채점 및 피드백 아이콘 표시 */
export const checkAnswers = (
  canvas: Canvas,
  choices: Choice[],
  selectedIds: string[],
  onWrong: () => void,
  showCorrect: boolean
) => {
  const correctIds = choices.filter((c) => c.isAnswer).map((c) => c.objectId);
  const selectedSet = new Set(selectedIds);

  /** 정답을 전부 맞혔는지 여부 */
  const isAllCorrect =
    selectedIds.length === correctIds.length &&
    selectedIds.every((id) => correctIds.includes(id));

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

    const bounds = obj.getBoundingRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const isSelected = selectedSet.has(choice.objectId);

    /** 정답인데 선택하지 않음 → showCorrect일 때만 표시 */
    if (choice.isAnswer && isSelected) {
      rect.set({ stroke: "#33E651", strokeWidth: 3 });
      canvas.add(createFeedbackIcon(true, centerX, centerY));
    } else if (!choice.isAnswer && isSelected) {
      rect.set({ stroke: "#FF4D4F", strokeWidth: 3 });
      canvas.add(createFeedbackIcon(false, centerX, centerY));
    } else if (choice.isAnswer && !isSelected && showCorrect) {
      rect.set({ stroke: "#33E651", strokeWidth: 3 });
      canvas.add(createFeedbackIcon(true, centerX, centerY));
    }
  });

  if (!isAllCorrect) onWrong();
  canvas.requestRenderAll();
};
