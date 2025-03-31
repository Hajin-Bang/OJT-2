/** 캔버스 영역 */
export default function CanvasArea() {
  return (
    <div className="p-2">
      <div
        id="canvas-container"
        className="w-full max-w-[750px] min-w-[400px] h-[500px] bg-white border border-gray-300 rounded shadow"
      >
        <p className="text-center text-gray-400 pt-[230px]">Canvas Area</p>
      </div>
    </div>
  );
}
