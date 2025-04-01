import type { Canvas } from "fabric";

declare global {
  interface Window {
    canvas: Canvas;
  }
}
