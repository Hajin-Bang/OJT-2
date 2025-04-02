import { Group, ActiveSelection } from "fabric";
import { getCanvas } from "../../utils/canvas";

/** 두 요소를 Grouping하는 handler */
export const handleGroup = () => {
  const canvas = getCanvas();
  const selected = canvas.getActiveObjects();

  if (selected.length <= 1) return;

  const group = new Group([...selected]);
  canvas.discardActiveObject();
  selected.forEach((obj) => canvas.remove(obj));
  canvas.add(group);
  canvas.setActiveObject(group);
  canvas.renderAll();
};

/** 요소의 Grouping을 해제하는 handler */
export const handleUngroup = () => {
  const canvas = getCanvas();
  const selected = canvas?.getActiveObjects();

  if (selected.length !== 1) return;

  const group = selected[0];
  if (!(group instanceof Group)) return;

  const items = group.removeAll();
  canvas.remove(group);
  items.forEach((obj) => canvas.add(obj));

  const selection = new ActiveSelection(items, { canvas });
  canvas.setActiveObject(selection);
  canvas.renderAll();
};
