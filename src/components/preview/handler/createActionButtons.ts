import { Canvas } from "fabric";
import { ActionButton } from "../ActionButton";

/** Preview 캔버스 하단에 위치한 채점 & 다음 버튼 */
export const createActionButtons = (
  canvas: Canvas,
  onCheck: () => void
): ActionButton => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();
  const buttonWidth = 150;
  const buttonHeight = 50;
  const marginBottom = 35;
  const startX = (canvasWidth - buttonWidth) / 2;
  const y = canvasHeight - buttonHeight - marginBottom;

  const checkButton = new ActionButton(startX, y, "check", onCheck);
  checkButton.setDisabled(true); /** 초기 비활성화 */

  canvas.add(checkButton);
  canvas.renderAll();

  return checkButton;
};
