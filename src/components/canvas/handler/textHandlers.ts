import { Textbox } from "fabric";

/** 기울기 */
export const toggleItalic = () => {
  const canvas = window.canvas;
  const active = canvas?.getActiveObject();

  if (active && active.type === "textbox") {
    const textbox = active as Textbox;
    textbox.set(
      "fontStyle",
      textbox.fontStyle === "italic" ? "normal" : "italic"
    );
    canvas.requestRenderAll();
  }
};

/** 정렬  */
export const changeTextAlign = () => {
  const canvas = window.canvas;
  const active = canvas?.getActiveObject();

  if (active && active.type === "textbox") {
    const textbox = active as Textbox;
    const alignments = ["left", "center", "right"] as const;
    const currentIndex = alignments.indexOf(
      textbox.textAlign as (typeof alignments)[number]
    );
    const next = alignments[(currentIndex + 1) % alignments.length];
    textbox.set("textAlign", next);
    canvas.requestRenderAll();
  }
};

/** 글자 크기 증가 */
export const increaseFontSize = () => {
  const canvas = window.canvas;
  const active = canvas?.getActiveObject();

  if (active && active.type === "textbox") {
    const textbox = active as Textbox;
    const nextSize = (textbox.fontSize || 16) + 2;
    textbox.set("fontSize", nextSize);
    canvas.requestRenderAll();
  }
};

/** 글자 크기 감소 */
export const decreaseFontSize = () => {
  const canvas = window.canvas;
  const active = canvas?.getActiveObject();

  if (active && active.type === "textbox") {
    const textbox = active as Textbox;
    const nextSize = Math.max(8, (textbox.fontSize || 16) - 2);
    textbox.set("fontSize", nextSize);
    canvas.requestRenderAll();
  }
};
