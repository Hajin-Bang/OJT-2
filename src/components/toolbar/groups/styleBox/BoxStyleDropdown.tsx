import { useState } from "react";
import {
  addChoiceBox,
  addQuestionBox,
  addMatchingBox,
} from "../../../../components/canvas/handler/addStyleBox";
import { FiCheckSquare } from "react-icons/fi";
import ToolButton from "../../Toolbutton";

/** 박스 스타일 옵션 */
const BOX_OPTIONS = [
  {
    label: "ChoiceBox",
    onClick: addChoiceBox,
    boxStyle: "w-[60px] h-[25px] border-[2px] border-[#D1D1D1] rounded-[8px]",
  },
  {
    label: "QuestionBox",
    onClick: addQuestionBox,
    boxStyle:
      "w-[60px] h-[25px] border-[2px] border-gray-400 border-dashed rounded-[8px]",
  },
  {
    label: "MatchingBox",
    onClick: addMatchingBox,
    boxStyle: "w-[60px] h-[25px] bg-[#e6e3e3] rounded-[8px]",
  },
] as const;

export default function BoxStyleDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* 드롭다운 버튼 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 flex items-center justify-center rounded hover:bg-white cursor-pointer"
      >
        <ToolButton
          icon={<FiCheckSquare size={23} />}
          label="Style Box"
          onClick={() => {}}
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {open && (
        <div
          className="absolute z-20 top-[110%] left-1/2 -translate-x-1/2 mt-2 
                     bg-white shadow rounded-md border border-gray-200 
                     flex gap-2 px-3 py-2 w-fit"
        >
          {BOX_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              className="relative group p-2 hover:bg-gray-100 rounded-md"
              onClick={() => {
                opt.onClick();
                setOpen(false);
              }}
            >
              <div className={opt.boxStyle}></div>
              {/* 툴팁 */}
              <span
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 
                text-md bg-gray-500 text-white rounded px-2 py-1 
                opacity-0 group-hover:opacity-100 
                pointer-events-none whitespace-nowrap z-10 transition"
              >
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
