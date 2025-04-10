import { useRef, useState } from "react";
import { FiAlignLeft, FiAlignCenter, FiAlignRight } from "react-icons/fi";
import { Textbox } from "fabric";
import { getCanvas } from "../../../utils/canvas";
import { useOutsideClick } from "../../../hook/useOutsideClick";
import ToolButton from "../../Toolbutton";

const ALIGN_OPTIONS = [
  { icon: <FiAlignLeft size={20} />, value: "left" },
  { icon: <FiAlignCenter size={20} />, value: "center" },
  { icon: <FiAlignRight size={20} />, value: "right" },
] as const;

type AlignType = (typeof ALIGN_OPTIONS)[number]["value"];

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
      canvas.fire("object:modified", { target: textbox });
      canvas.renderAll();
      setSelected(value);
      setOpen(false);
    }
  };

  return (
    <div className="relative group" ref={wrapperRef}>
      <ToolButton
        icon={ALIGN_OPTIONS.find((opt) => opt.value === selected)?.icon}
        label="Text Align"
        onClick={() => setOpen((prev) => !prev)}
      />

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
