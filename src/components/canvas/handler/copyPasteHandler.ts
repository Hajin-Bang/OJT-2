import { Canvas } from "fabric";
import { FabricObject } from "fabric";
import { v4 as uuidv4 } from "uuid";

let copiedObject: FabricObject | null = null;

/** 현재 선택된 객체를 복사 */
export const handleCopy = async (canvas: Canvas) => {
  const activeObject = canvas.getActiveObject();
  if (activeObject && "clone" in activeObject) {
    copiedObject = await (activeObject as FabricObject).clone();
  }
};

/** 복사된 객체를 붙여넣기 */
export const handlePaste = async (canvas: Canvas) => {
  if (!copiedObject) {
    return;
  }

  const cloned = await copiedObject.clone();
  cloned.set({
    left: (cloned.left ?? 0) + 50,
    top: (cloned.top ?? 0) + 50,
    id: uuidv4(),
    selectable: true,
    evented: true,
  });

  canvas.add(cloned);
  canvas.setActiveObject(cloned);
  canvas.requestRenderAll();
};
