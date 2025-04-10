import { useRef, useState } from "react";
import { BsBorderWidth } from "react-icons/bs";
import { getCanvas } from "../../../utils/canvas";
import { useOutsideClick } from "../../../hook/useOutsideClick";

const strokeOptions = [1, 2, 3, 4, 8, 12, 16, 24];

/** 선 굵기를 결정하는 shape tool */
export default function StrokeWidthDropdown() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, () => setOpen(false));

  const handleChange = (value: number) => {
    setOpen(false);

    const canvas = getCanvas();
    const active = canvas?.getActiveObject();
    if (active) {
      active.set("strokeWidth", value);
      canvas.renderAll();
      canvas.fire("object:modified", { target: active });
    }
  };

  return (
    <div className="relative group" ref={wrapperRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 flex items-center justify-center rounded hover:bg-white cursor-pointer"
      >
        <BsBorderWidth size={22} />
      </button>

      {/* 툴팁 */}
      {!open && (
        <span
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 
                     text-md bg-gray-500 text-white rounded px-2 py-1 
                     opacity-0 group-hover:opacity-100 
                     pointer-events-none whitespace-nowrap z-10 transition"
        >
          Stroke Width
        </span>
      )}

      {/* 드롭다운 */}
      {open && (
        <ul className="absolute z-20 top-[110%] left-1/2 -translate-x-1/2 mt-2 w-24 bg-white shadow rounded text-sm border border-gray-200">
          {strokeOptions.map((px) => (
            <li
              key={px}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-center"
              onClick={() => handleChange(px)}
            >
              {px}px
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
