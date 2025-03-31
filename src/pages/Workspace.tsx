import CanvasArea from "../components/canvas/CanvasArea";
import Toolbar from "../components/toolbar/Toolbar";

export default function Workspace() {
  return (
    <div className="flex h-screen ">
      {/* 사이드바 */}
      <aside className="w-[80px] bg-[#e4f6e4] flex flex-col items-center p-2 mt-14 rounded-r-3xl"></aside>

      {/* 툴바 + 캔버스 */}
      <div className="flex-1 flex flex-col ml-12">
        {/* 툴바 */}
        <header className="h-[50px] mt-20 mb-2">
          <Toolbar />
        </header>

        {/* 캔버스 */}
        <main className="flex-1 overflow-auto">
          <CanvasArea />
        </main>
      </div>
    </div>
  );
}
