import { Textbox } from "fabric";

/** 틀린 횟수를 표시하는 텍스트박스 */
export const createWrongCountDisplay = (
  wrongCount: number,
  maxCount: number,
  canvasWidth: number
) => {
  const padding = 12;
  const text = `틀린 횟수: ${wrongCount} / ${maxCount}`;

  const display = new Textbox(text, {
    left: canvasWidth - padding,
    top: padding,
    width: 110,
    fontSize: 18,
    fill: "#555",
    fontWeight: "bold",
    originX: "right",
    originY: "top",
    selectable: false,
    evented: false,
    padding: 4,
  });

  return display;
};
