import { useState } from "react";
import CanvasArea from "../components/canvas/CanvasArea";
import RightPanel from "../components/right/RightPanel";
import Toolbar from "../components/toolbar/Toolbar";
import PreviewModal from "../components/preview/PreviewModal";

export default function Workspace() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 왼쪽 사이드바 */}
      <aside className="w-[50px] bg-[#aaddaa] flex flex-col items-center p-2 mt-14 rounded-tr-3xl" />
      {/* 전체 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col">
        {/* 상단 툴바 */}
        <header className="h-[50px] mt-20 mb-2 ml-14">
          <Toolbar onPreview={() => setShowPreview(true)} />
        </header>

        {/* 캔버스 + 오른쪽 패널 */}
        <div className="flex-1 flex ml-12 overflow-hidden">
          {/* 캔버스 영역 */}
          <div className="flex-none">
            <CanvasArea />
          </div>

          {/* 오른쪽 패널 */}
          <div className="flex-1">
            <RightPanel />
          </div>
        </div>
      </div>
      {showPreview && <PreviewModal onClose={() => setShowPreview(false)} />}
    </div>
  );
}
