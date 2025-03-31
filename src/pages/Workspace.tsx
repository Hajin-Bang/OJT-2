import CanvasArea from "../components/canvas/CanvasArea";
import RightPanel from "../components/right/RightPanel";
import Toolbar from "../components/toolbar/Toolbar";

export default function Workspace() {
  return (
    <div className="flex h-screen">
      {/* 왼쪽 사이드바 */}
      <aside className="w-[80px] bg-[#aaddaa] flex flex-col items-center p-2 mt-14 rounded-r-3xl" />

      {/* 전체 콘텐츠 영역 */}
      <div className="flex flex-col flex-1">
        {/* 상단 툴바 */}
        <header className="h-[50px] mt-20 mb-2 ml-14">
          <Toolbar />
        </header>

        {/* 캔버스 + 오른쪽 패널 */}
        <div
          className="grid flex-1 ml-12 overflow-hidden"
          style={{ gridTemplateColumns: "5fr 5fr" }}
        >
          <div className="overflow-hidden">
            <CanvasArea />
          </div>

          <div className="overflow-auto">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
