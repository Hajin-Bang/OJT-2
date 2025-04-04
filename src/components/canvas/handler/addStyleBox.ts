import { getCanvas } from "../../utils/canvas";
import { Rect } from "fabric";
import { v4 as uuidv4 } from "uuid";

/** 지정된 디자인의 Box를 생성 */

/** ChoiceBox */
export const addChoiceBox = () => {
  const canvas = getCanvas();

  const button = new Rect({
    left: 100,
    top: 100,
    width: 180,
    height: 70,
    fill: "transparent",
    stroke: "#D1D1D1",
    strokeWidth: 2,
    rx: 15,
    ry: 15,
  });

  button.set({ id: uuidv4() });

  canvas.add(button);
  canvas.setActiveObject(button);
  canvas.renderAll();
};

/** QuestionBox */
export const addQuestionBox = () => {
  const canvas = getCanvas();

  const viewBox = new Rect({
    left: 400,
    top: 100,
    width: 500,
    height: 120,
    fill: "transparent",
    stroke: "gray",
    strokeDashArray: [5, 5],
    strokeWidth: 2,
    rx: 10,
    ry: 10,
  });

  viewBox.set({ id: uuidv4() });

  canvas.add(viewBox);
  canvas.setActiveObject(viewBox);
  canvas.renderAll();
};

/** MatchingBox */
export const addMatchingBox = () => {
  const canvas = getCanvas();

  const matchingBox = new Rect({
    left: 700,
    top: 100,
    width: 180,
    height: 60,
    fill: "#e6e3e3",
    stroke: "#e6e3e3",
    strokeWidth: 2,
    rx: 10,
    ry: 10,
  });

  matchingBox.set({ id: uuidv4() });

  canvas.add(matchingBox);
  canvas.setActiveObject(matchingBox);
  canvas.renderAll();
};
