import { useRef, useState } from "react";
import ToolButton from "../../Toolbutton";
import {
  addChoiceText,
  addQuestionText,
  addViewText,
} from "../../../canvas/handler/addStyleText";
import { LuFileText } from "react-icons/lu";
import { useOutsideClick } from "../../../hook/useOutsideClick";

/** 텍스트 스타일 옵션 */
const TEXT_OPTIONS = [
  {
    onClick: addQuestionText,
    textStyle: "Question Text",
    className: "text-center text-[18px] font-bold",
  },
  {
    onClick: addChoiceText,
    textStyle: "Choice Text",
    className: "text-center text-[15px] font-bold",
  },
  {
    onClick: addViewText,
    textStyle: "ViewText",
    className: "text-center text-[20px] font-bold",
  },
] as const;

export default function TextStyleDropdown() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, () => setOpen(false));

  return (
    <div className="relative" ref={wrapperRef}>
      {/* 드롭다운 버튼 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 flex flex-col items-center justify-center rounded hover:bg-white cursor-pointer"
      >
        <ToolButton
          icon={<LuFileText size={23} />}
          label="Main Text"
          onClick={() => {}}
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {open && (
        <div
          className="absolute z-20 w-[160px] top-[90%] left-1/2 -translate-x-1/2 mt-2 
                       bg-white shadow rounded-md border border-gray-200 
                       flex flex-col"
        >
          {TEXT_OPTIONS.map((opt) => (
            <button
              key={opt.textStyle}
              className="relative group hover:bg-gray-100 cursor-pointer p-1 pt-2 pb-2"
              onClick={() => {
                opt.onClick();
                setOpen(false);
              }}
            >
              {/* 미리보기 텍스트 */}
              <div className={opt.className}>{opt.textStyle}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
