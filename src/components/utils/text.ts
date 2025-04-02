import { Textbox } from "fabric";
import { getCanvas } from "./canvas";

/**
 * 현재 선택된 텍스트박스를 가져오는 유틸
 * 없거나 타입이 다르면 null 반환
 */
export const getActiveTextbox = (): Textbox | null => {
  const canvas = getCanvas();
  const active = canvas.getActiveObject();
  return active?.type === "textbox" ? (active as Textbox) : null;
};
