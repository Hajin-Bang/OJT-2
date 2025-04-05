import { Circle } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { getCanvas } from "../../utils/canvas";

/** 원을 추가하는 handler */
export const addCircle = () => {
  const canvas = getCanvas();

  const circle = new Circle({
    left: 100,
    top: 100,
    radius: 40,
    fill: "white",
    stroke: "#000000",
    strokeWidth: 2,
    strokeUniform: true,
  });

  circle.set({ id: uuidv4() });

  canvas.add(circle);
  canvas.setActiveObject(circle);
  canvas.renderAll();
};
