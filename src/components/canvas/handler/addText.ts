import { Textbox } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { getCanvas } from "../../utils/canvas";

/** 텍스트를 추가하는 handler */
export const addText = () => {
  const canvas = getCanvas();

  const text = new Textbox("TEXT", {
    left: 20,
    top: 20,
    width: 200,
    fontSize: 25,
    fontFamily: "sans-serif",
    fill: "#333333",
    fontWeight: "600",
  });

  text.set({ id: uuidv4() });

  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.renderAll();
};
