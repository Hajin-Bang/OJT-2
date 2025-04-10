import { useState, useEffect, useRef } from "react";
import { getCanvas } from "../../../utils/canvas";
import { Textbox } from "fabric";
import { useOutsideClick } from "../../../hook/useOutsideClick";

const FONT_OPTIONS = [
  "Times New Roman",
  "sans-serif",
  "serif",
  "monospace",
  "Arial",
  "Noto Sans KR",
] as const;

export default function FontFamilyDropdown() {
  const [open, setOpen] = useState(false);
  const [currentFont, setCurrentFont] = useState("sans-serif");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, () => setOpen(false));

  useEffect(() => {
    /** 현재 font 가져오기 */
    const canvas = getCanvas();
    const active = canvas?.getActiveObject();

    if (active && active.type === "textbox") {
      const textbox = active as Textbox;
      setCurrentFont(textbox.fontFamily || "sans-serif");
    }
  }, []);

  const applyFont = (font: string) => {
    const canvas = getCanvas();
    const active = canvas?.getActiveObject();

    if (active && active.type === "textbox") {
      const textbox = active as Textbox;
      textbox.set("fontFamily", font);
      canvas.fire("object:modified", { target: textbox });
      canvas.renderAll();
      setCurrentFont(font);
      setOpen(false);
    }
  };

  return (
    <div className="relative group" ref={wrapperRef}>
      {/* 현재 폰트명 버튼 */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="px-3 w-45 h-10 rounded-md border bg-white shadow border-gray-300 text-gray-800 text-md cursor-pointer flex items-center justify-center"
        style={{ fontFamily: currentFont }}
      >
        {currentFont}
      </div>

      {/* 드롭다운 */}
      {open && (
        <div className="absolute z-20 top-[90%] left-1/2 -translate-x-1/2 mt-2 bg-white shadow rounded-md border border-gray-200 w-[180px]">
          {FONT_OPTIONS.map((font) => (
            <button
              key={font}
              onClick={() => applyFont(font)}
              className="block w-full px-3 py-2 text-sm hover:bg-gray-100 text-center cursor-pointer"
              style={{ fontFamily: font }}
            >
              {font}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
