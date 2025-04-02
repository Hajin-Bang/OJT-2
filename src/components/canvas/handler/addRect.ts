import { Rect } from "fabric";
import { v4 as uuidv4 } from "uuid";

/** 사각형을 추가하는 handler */
export const addRect = () => {
  const rect = new Rect({
    left: 0,
    top: 0,
    fill: "transparent",
    width: 100,
    height: 100,
    stroke: "#000000",
    strokeUniform: true,
  });

  rect.set({ id: uuidv4() });

  const canvas = window.canvas;
  if (canvas) {
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.requestRenderAll();
  }
};
