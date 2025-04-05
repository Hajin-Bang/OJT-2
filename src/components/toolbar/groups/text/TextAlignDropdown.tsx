import { useRef, useState } from "react";
import { FiAlignLeft, FiAlignCenter, FiAlignRight } from "react-icons/fi";
import { Textbox } from "fabric";
import { getCanvas } from "../../../utils/canvas";
import { useOutsideClick } from "../../../hook/useOutsideClick";

const ALIGN_OPTIONS = [
  { icon: <FiAlignLeft size={20} />, value: "left" },
  { icon: <FiAlignCenter size={20} />, value: "center" },
  { icon: <FiAlignRight size={20} />, value: "right" },
] as const;

type AlignType = (typeof ALIGN_OPTIONS)[number]["value"];

/** 텍스트 정렬 */
export default function TextAlignDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<AlignType>("left");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, () => setOpen(false));

  const applyAlign = (value: AlignType) => {
    const canvas = getCanvas();
    const active = canvas?.getActiveObject();

    if (active && active.type === "textbox") {
      const textbox = active as Textbox;
      textbox.set("textAlign", value);
      canvas.renderAll();
      setSelected(value);
      setOpen(false);
    }
  };

  return (
    <div className="relative group" ref={wrapperRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 flex items-center justify-center rounded hover:bg-white cursor-pointer"
      >
        {ALIGN_OPTIONS.find((opt) => opt.value === selected)?.icon}
      </button>

      {/* 툴팁 */}
      {!open && (
        <span
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 
                     text-md bg-gray-500 text-white rounded px-2 py-1 
                     opacity-0 group-hover:opacity-100 
                     pointer-events-none whitespace-nowrap z-10 transition"
        >
          Text Align
        </span>
      )}

      {/* 드롭다운 */}
      {open && (
        <div className="absolute z-20 top-[90%] left-1/2 -translate-x-1/2 mt-2 bg-white shadow rounded-md border border-gray-200 flex">
          {ALIGN_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => applyAlign(opt.value)}
            >
              {opt.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
