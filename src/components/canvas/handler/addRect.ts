import { Rect } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { getCanvas } from "../../utils/canvas";

/** 사각형을 추가하는 handler */
export const addRect = () => {
  const canvas = getCanvas();

  const rect = new Rect({
    left: 0,
    top: 0,
    fill: "white",
    width: 100,
    height: 100,
    stroke: "#000000",
    strokeUniform: true,
  });

  rect.set({ id: uuidv4() });

  canvas.add(rect);
  canvas.setActiveObject(rect);
  canvas.renderAll();
};
