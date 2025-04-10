import { getCanvas } from "../../utils/canvas";
import { getActiveTextbox } from "../../utils/text";

/** 굵게 */
export const toggleBold = () => {
  const textbox = getActiveTextbox();
  if (!textbox) return;

  textbox.set("fontWeight", textbox.fontWeight === "bold" ? "normal" : "bold");
  textbox.fire("modified");
  getCanvas().renderAll();
  getCanvas().fire("object:modified", { target: textbox });
};

/** 기울기 */
export const toggleItalic = () => {
  const textbox = getActiveTextbox();
  if (!textbox) return;

  textbox.set(
    "fontStyle",
    textbox.fontStyle === "italic" ? "normal" : "italic"
  );
  textbox.fire("modified");
  getCanvas().renderAll();
  getCanvas().fire("object:modified", { target: textbox });
};

/** 정렬 */
export const changeTextAlign = () => {
  const textbox = getActiveTextbox();
  if (!textbox) return;

  const alignments = ["left", "center", "right"] as const;
  const currentIndex = alignments.indexOf(
    textbox.textAlign as (typeof alignments)[number]
  );
  const next = alignments[(currentIndex + 1) % alignments.length];
  textbox.set("textAlign", next);
  getCanvas().renderAll();
};

/** 글자 크기 증가 */
export const increaseFontSize = () => {
  const textbox = getActiveTextbox();
  if (!textbox) return;

  textbox.set("fontSize", (textbox.fontSize || 16) + 2);
  getCanvas().renderAll();
};

/** 글자 크기 감소 */
export const decreaseFontSize = () => {
  const textbox = getActiveTextbox();
  if (!textbox) return;

  textbox.set("fontSize", Math.max(8, (textbox.fontSize || 16) - 2));
  getCanvas().renderAll();
};
