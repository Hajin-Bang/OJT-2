import { Rect } from "fabric";

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

  const canvas = window.canvas;
  if (canvas) {
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.requestRenderAll();
  }
};
