import { Circle, Textbox, Object as FabricObject } from "fabric";

/** 정답 또는 오답 아이콘 생성 함수 */
export function createFeedbackIcon(
  isCorrect: boolean,
  x: number,
  y: number
): FabricObject {
  const common = {
    selectable: false,
    data: { type: "feedback" } as const,
  };

  if (isCorrect) {
    return new Circle({
      ...common,
      left: x - 28,
      top: y - 28,
      radius: 25,
      stroke: "#33E651",
      strokeWidth: 5,
      fill: "transparent",
    });
  } else {
    return new Textbox("\u2715", {
      ...common,
      left: x,
      top: y,
      fontSize: 50,
      fill: "#FF4D4D",
      fontWeight: "bold",
      originX: "center",
      originY: "center",
    });
  }
}

/** 피드백 아이콘 판별 함수 */
export function isFeedbackIcon(
  obj: FabricObject
): obj is FabricObject & { data: { type: "feedback" } } {
  return (
    "data" in obj &&
    !!obj.data &&
    typeof obj.data === "object" &&
    "type" in obj.data &&
    obj.data.type === "feedback"
  );
}
