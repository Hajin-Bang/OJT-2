import { Circle } from "fabric";

/** 원을 추가하는 handler */
export const addCircle = () => {
  const circle = new Circle({
    left: 0,
    top: 0,
    radius: 40,
    fill: "transparent",
    stroke: "#000000",
    strokeUniform: true,
  });

  const canvas = window.canvas;
  if (canvas) {
    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.requestRenderAll();
  }
};
