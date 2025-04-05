import { Canvas, Line, Object } from "fabric";

interface GuideLine {
  canvas: Canvas;
  margin?: number;
}

const DEFAULT_MARGIN = 5;

/** 캔버스 중앙 또는 다른 오브젝트와 정렬 시 가이드라인을 보여주는 함수 */
export function enableGuideLines({
  canvas,
  margin = DEFAULT_MARGIN,
}: GuideLine) {
  /** 현재 표시 중인 가이드라인 객체를 저장 */
  let verticalLine: Line | null = null;
  let horizontalLine: Line | null = null;

  /** 현재 이동 중인 오브젝트를 제외한 나머지 오브젝트만 가져오기 */
  const getOtherObjects = () =>
    canvas.getObjects().filter((obj) => obj !== canvas.getActiveObject());

  /**
   * 가이드라인 생성 함수
   * @param isVertical 세로선 여부
   * @param position 선 시작 좌표
   * @param length 길이
   * @param offset 시작점 offset (기본 0)
   */
  const createGuideLine = (
    isVertical: boolean,
    position: number,
    length: number,
    offset = 0
  ) => {
    const lineProps = {
      stroke: "rgba(255, 20, 20, 0.502)",
      strokeWidth: 1,
      selectable: false,
      evented: false,
      excludeFromExport: true,
    };

    return isVertical
      ? new Line([position, offset, position, offset + length], lineProps)
      : new Line([offset, position, offset + length, position], lineProps);
  };

  /** 기존 가이드라인 제거 */
  const clearLines = () => {
    if (verticalLine) canvas.remove(verticalLine);
    if (horizontalLine) canvas.remove(horizontalLine);
    verticalLine = null;
    horizontalLine = null;
  };

  /** 정렬 기준 판단 후 보조선 그리기 */
  const snapToGuides = (movingObj: Object) => {
    const objCenter = movingObj.getCenterPoint();
    const canvasCenter = {
      x: canvas.getWidth() / 2,
      y: canvas.getHeight() / 2,
    };

    let snappedX = false;
    let snappedY = false;

    clearLines();

    /** 캔버스 중앙 기준 정렬 */
    if (Math.abs(objCenter.x - canvasCenter.x) < margin) {
      verticalLine = createGuideLine(true, canvasCenter.x, canvas.getHeight());
      canvas.add(verticalLine);
      snappedX = true;
      movingObj.left = canvasCenter.x - movingObj.getScaledWidth() / 2;
    }

    if (Math.abs(objCenter.y - canvasCenter.y) < margin) {
      horizontalLine = createGuideLine(
        false,
        canvasCenter.y,
        canvas.getWidth()
      );
      canvas.add(horizontalLine);
      snappedY = true;
      movingObj.top = canvasCenter.y - movingObj.getScaledHeight() / 2;
    }

    /** 특정 오브젝트 기준 정렬 */
    for (const obj of getOtherObjects()) {
      const targetCenter = obj.getCenterPoint();

      if (Math.abs(objCenter.x - targetCenter.x) < margin && !snappedX) {
        verticalLine = createGuideLine(
          true,
          targetCenter.x,
          obj.getScaledHeight(),
          obj.top ?? 0
        );
        canvas.add(verticalLine);
        snappedX = true;
        movingObj.left = targetCenter.x - movingObj.getScaledWidth() / 2;
      }

      if (Math.abs(objCenter.y - targetCenter.y) < margin && !snappedY) {
        horizontalLine = createGuideLine(
          false,
          targetCenter.y,
          obj.getScaledWidth(),
          obj.left ?? 0
        );
        canvas.add(horizontalLine);
        snappedY = true;
        movingObj.top = targetCenter.y - movingObj.getScaledHeight() / 2;
      }
    }

    if (snappedX || snappedY) {
      movingObj.setCoords();
    }
  };

  canvas.on("object:moving", (e) => {
    if (!e.target) return;
    snapToGuides(e.target);
  });

  canvas.on("mouse:up", clearLines);
}
