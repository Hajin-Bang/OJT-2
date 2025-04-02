import { Circle } from "fabric";
import { v4 as uuidv4 } from "uuid";

/** 원을 추가하는 handler */
export const addCircle = () => {
  const canvas = window.canvas;
  if (!canvas) return;

  const circle = new Circle({
    left: 100,
    top: 100,
    radius: 40,
    fill: "transparent",
    stroke: "#000000",
    strokeWidth: 2,
    strokeUniform: true,
  });

  circle.set({ id: uuidv4() });

  canvas.add(circle);
  canvas.setActiveObject(circle);
  canvas.requestRenderAll();
};
