import type { Canvas } from "fabric";

declare global {
  interface Window {
    canvas: Canvas;
  }
}

declare module "fabric" {
  interface Object {
    id?: string;
  }
}
