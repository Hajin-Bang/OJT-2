import { Canvas } from "fabric";

export const initializeCanvas = (canvasEl: HTMLCanvasElement) => {
  canvasEl.width = 800;
  canvasEl.height = 550;

  return new Canvas(canvasEl, {
    backgroundColor: "white",
    selection: false,
  });
};
