import { useState, useEffect } from "react";
import { getCanvas } from "../../../utils/canvas";
import { Textbox } from "fabric";

const FONT_OPTIONS = [
  "sans-serif",
  "serif",
  "monospace",
  "Arial",
  "Noto Sans KR",
] as const;

export default function FontFamilyDropdown() {
  const [open, setOpen] = useState(false);
  const [currentFont, setCurrentFont] = useState("sans-serif");

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
      canvas.renderAll();
      setCurrentFont(font);
      setOpen(false);
    }
  };

  return (
    <div className="relative group">
      {/* 현재 폰트명 버튼 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-3 w-30 h-10 rounded-md border bg-white shadow border-gray-300 text-gray-800 text-md cursor-pointer"
        style={{ fontFamily: currentFont }}
      >
        {currentFont}
      </button>

      {/* 드롭다운 */}
      {open && (
        <div className="absolute z-20 top-[110%] left-1/2 -translate-x-1/2 mt-2 bg-white shadow rounded-md border border-gray-200 w-[160px]">
          {FONT_OPTIONS.map((font) => (
            <button
              key={font}
              onClick={() => applyFont(font)}
              className="block w-full px-3 py-2 text-sm hover:bg-green-50 text-center cursor-pointer"
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
