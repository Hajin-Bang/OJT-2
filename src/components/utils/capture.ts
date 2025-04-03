import { Canvas, Object } from "fabric";

/** 특정 객체만 보이도록 하고 해당 영역만 캡처한 dataURL 반환 */
export const captureSingleObject = (canvas: Canvas, target: Object): string => {
  const allObjects = canvas.getObjects();
  const otherObjects = allObjects.filter((obj) => obj !== target);

  /** 다른 객체 숨기기 */
  otherObjects.forEach((obj) => obj.set({ opacity: 0, selectable: false }));

  const boundingBox = target.getBoundingRect();
  const dataUrl = canvas.toDataURL({
    format: "png",
    left: boundingBox.left,
    top: boundingBox.top,
    width: boundingBox.width,
    height: boundingBox.height,
    multiplier: 1,
  });

  /** 다시 복원 */
  otherObjects.forEach((obj) => obj.set({ opacity: 1, selectable: true }));
  canvas.renderAll();

  return dataUrl;
};
