import { getCanvas } from "../../utils/canvas";
import { Textbox } from "fabric";
import { v4 as uuidv4 } from "uuid";

/** 지정된 디자인의 Text를 생성 */

/** QuestionText */
export const addQuestionText = () => {
  const canvas = getCanvas();

  const questionText = new Textbox("TEXT", {
    left: 100,
    top: 100,
    width: 650,
    fontSize: 24,
    fontWeight: "bold",
    fill: "black",
    textAlign: "left",
    fontFamily: "Times New Roman",
  });

  questionText.set({ id: uuidv4() });

  canvas.add(questionText);
  canvas.setActiveObject(questionText);
  canvas.renderAll();
};

/** ChoiceText */
export const addChoiceText = () => {
  const canvas = getCanvas();

  const choiceText = new Textbox("TEXT", {
    left: 100,
    top: 100,
    fill: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Arial",
    fontSize: 22,
  });

  choiceText.set({ id: uuidv4() });

  canvas.add(choiceText);
  canvas.setActiveObject(choiceText);
  canvas.renderAll();
};

/** ViewText */
export const addViewText = () => {
  const canvas = getCanvas();

  const viewText = new Textbox("TEXT", {
    left: 100,
    top: 100,
    fontSize: 28,
    fill: "black",
    textAlign: "center",
    fontFamily: "sans-serif",
    fontWeight: "bold",
  });

  viewText.set({ id: uuidv4() });

  canvas.add(viewText);
  canvas.setActiveObject(viewText);
  canvas.renderAll();
};
