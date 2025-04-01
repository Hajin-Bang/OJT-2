import { useState } from "react";
import { FiAlignLeft, FiAlignCenter, FiAlignRight } from "react-icons/fi";
import { Textbox } from "fabric";

const ALIGN_OPTIONS = [
  { icon: <FiAlignLeft size={20} />, value: "left" },
  { icon: <FiAlignCenter size={20} />, value: "center" },
  { icon: <FiAlignRight size={20} />, value: "right" },
] as const;

type AlignType = (typeof ALIGN_OPTIONS)[number]["value"];

/** 정렬 tool 드롭다운 */
export default function TextAlignDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<AlignType>("left");

  const applyAlign = (value: AlignType) => {
    const canvas = window.canvas;
    const active = canvas?.getActiveObject();

    if (active && active.type === "textbox") {
      const textbox = active as Textbox;
      textbox.set("textAlign", value);
      canvas.requestRenderAll();
      setSelected(value);
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 flex items-center justify-center cursor-pointer"
      >
        {ALIGN_OPTIONS.find((opt) => opt.value === selected)?.icon}
      </button>

      {open && (
        <div className="absolute top-10 left-0 bg-white shadow rounded-md flex z-50">
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
