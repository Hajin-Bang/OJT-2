import { Group } from "fabric";

/** 그룹핑 */
export default function MultiToolGroup() {
  /** 그룹핑 핸들러 */
  const handleGroup = () => {
    const canvas = window.canvas;
    const activeObjects = canvas?.getActiveObjects();

    if (canvas && activeObjects.length > 1) {
      const group = new Group(activeObjects);
      canvas.discardActiveObject();
      activeObjects.forEach((obj) => canvas.remove(obj));
      canvas.add(group);
      canvas.setActiveObject(group);
      canvas.requestRenderAll();
    }
  };

  return (
    <button
      onClick={handleGroup}
      className="px-3 py-2 text-sm font-semibold text-green-500 bg-green-50 rounded hover:bg-green-100 cursor-pointer"
    >
      GROUPING
    </button>
  );
}
