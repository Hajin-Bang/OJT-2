import { Group, Textbox } from "fabric";
import { getCanvas } from "../../utils/canvas";

/** 그룹 내에서 정렬 기준이 될 가장 큰 도형을 반환 */
const getReferenceShape = (group: Group) => {
  return group
    .getObjects()
    .filter((obj) => obj.type !== "textbox")
    .sort(
      (a, b) =>
        (b.width ?? 0) * (b.scaleX ?? 1) * (b.height ?? 0) * (b.scaleY ?? 1) -
        (a.width ?? 0) * (a.scaleX ?? 1) * (a.height ?? 0) * (a.scaleY ?? 1)
    )[0];
};

/** 그룹 내에서 Textbox 요소를 반환 */
const getTextbox = (group: Group) => {
  return group.getObjects().find((obj) => obj.type === "textbox") as
    | Textbox
    | undefined;
};

/** 텍스트를 기준 도형의 가로 중앙에 정렬하는 handler */
export const handleAlignTextHorizontal = () => {
  const canvas = getCanvas();
  const active = canvas.getActiveObject();
  if (!(active instanceof Group)) return;

  const shape = getReferenceShape(active);
  const text = getTextbox(active);
  if (!shape || !text) return;

  const shapeLeft = shape.left ?? 0;
  const shapeWidth = (shape.width ?? 0) * (shape.scaleX ?? 1);
  const textWidth = (text.width ?? 0) * (text.scaleX ?? 1);

  text.set({ left: shapeLeft + shapeWidth / 2 - textWidth / 2 });
  text.setCoords();
  canvas.requestRenderAll();
};

/** 텍스트를 기준 도형의 세로 중앙에 정렬하는 handler*/
export const handleAlignTextVertical = () => {
  const canvas = getCanvas();
  const active = canvas.getActiveObject();
  if (!(active instanceof Group)) return;

  const shape = getReferenceShape(active);
  const text = getTextbox(active);
  if (!shape || !text) return;

  const shapeTop = shape.top ?? 0;
  const shapeHeight = (shape.height ?? 0) * (shape.scaleY ?? 1);
  const textHeight = (text.height ?? 0) * (text.scaleY ?? 1);

  text.set({ top: shapeTop + shapeHeight / 2 - textHeight / 2 });
  text.setCoords();
  canvas.requestRenderAll();
};

/** 텍스트를 기준 도형의 가로 + 세로 정중앙에 정렬하는 handler */
export const handleAlignTextCenter = () => {
  handleAlignTextHorizontal();
  handleAlignTextVertical();
};
