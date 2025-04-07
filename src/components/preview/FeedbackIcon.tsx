import { Circle, Textbox } from "fabric";

/** 정답/오답 아이콘 */
export function createFeedbackIcon(isCorrect: boolean, x: number, y: number) {
  if (isCorrect) {
    return new Circle({
      left: x - 28,
      top: y - 28,
      radius: 25,
      stroke: "#33E651",
      strokeWidth: 5,
      fill: "transparent",
      selectable: false,
    });
  } else {
    return new Textbox("✕", {
      left: x,
      top: y,
      fontSize: 50,
      fill: "#FF4D4D",
      fontWeight: "bold",
      originX: "center",
      originY: "center",
      selectable: false,
    });
  }
}
