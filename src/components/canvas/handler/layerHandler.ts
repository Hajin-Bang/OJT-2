import { Object } from "fabric";
import { getCanvas } from "../../utils/canvas";

/**
 * 현재 캔버스에 재정렬된 오브젝트 순서를 반영
 * @param newOrder 재정렬된 오브젝트 배열
 */
const reorderObjects = (newOrder: Object[]) => {
  const canvas = getCanvas();

  /** 기존 객체 모두 제거 */
  canvas.getObjects().forEach((obj) => canvas.remove(obj));

  /** 새로운 순서대로 추가 */
  newOrder.forEach((obj) => canvas.add(obj));

  /**  렌더링, 선택 박스 반영 */
  canvas.discardActiveObject();
  canvas.setActiveObject(newOrder[newOrder.length - 1]);
  canvas.requestRenderAll();
};

/** 선택한 요소를 한 단계 앞으로 이동시키는 함수 */
export const bringForwardHandler = () => {
  const canvas = getCanvas();
  const objects = canvas.getObjects();
  const active = canvas.getActiveObject();
  if (!active) return;

  const index = objects.indexOf(active);
  if (index < 0 || index === objects.length - 1) return;

  const newOrder = [...objects];
  newOrder.splice(index, 1);
  newOrder.splice(index + 1, 0, active);

  reorderObjects(newOrder);
};

/** 선택한 요소를 한 단계 뒤로 이동시키는 함수 */
export const sendBackwardHandler = () => {
  const canvas = getCanvas();
  const objects = canvas.getObjects();
  const active = canvas.getActiveObject();
  if (!active) return;

  const index = objects.indexOf(active);
  if (index <= 0) return;

  const newOrder = [...objects];
  newOrder.splice(index, 1);
  newOrder.splice(index - 1, 0, active);

  reorderObjects(newOrder);
};

/** 선택한 요소르르 맨 앞으로 이동 */
export const bringToFrontHandler = () => {
  const canvas = getCanvas();
  const objects = canvas.getObjects();
  const active = canvas.getActiveObject();
  if (!active) return;

  const index = objects.indexOf(active);
  if (index === -1 || index === objects.length - 1) return;

  const newOrder = [...objects];
  newOrder.splice(index, 1);
  newOrder.push(active);

  reorderObjects(newOrder);
};

/** 선택한 요소를 맨 뒤로 이동 */
export const sendToBackHandler = () => {
  const canvas = getCanvas();
  const objects = canvas.getObjects();
  const active = canvas.getActiveObject();
  if (!active) return;

  const index = objects.indexOf(active);
  if (index <= 0) return;

  const newOrder = [...objects];
  newOrder.splice(index, 1);
  newOrder.unshift(active);

  reorderObjects(newOrder);
};
