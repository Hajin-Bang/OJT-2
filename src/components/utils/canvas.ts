export const getCanvas = () => {
  const canvas = window.canvas;
  if (!canvas) throw new Error("캔버스가 초기화되지 않음");
  return canvas;
};
