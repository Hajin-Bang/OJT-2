import { getCanvas } from "../../utils/canvas";

/** 현재 선택된 요소를 삭제하는 핸들러 */
export const handleDelete = () => {
  const canvas = getCanvas();

  const activeObject = canvas.getActiveObject();

  if (activeObject) {
    canvas.remove(activeObject);
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }
};
