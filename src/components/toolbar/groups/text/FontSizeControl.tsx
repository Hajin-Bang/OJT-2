import { useState, useEffect } from "react";
import { Textbox } from "fabric";
import { FiPlus, FiMinus } from "react-icons/fi";

/** 텍스트 크기를 control하는 tool button */
export default function FontSizeControl() {
  const [fontSize, setFontSize] = useState<number>(26);

  /** 현재 선택된 텍스트 객체의 폰트 크기 불러오기 */
  useEffect(() => {
    const canvas = window.canvas;
    const active = canvas?.getActiveObject();
    if (active && active.type === "textbox") {
      const textbox = active as Textbox;
      setFontSize(textbox.fontSize ?? 26);
    }
  }, []);

  /** 폰트 크기 조절 함수 */
  const updateFontSize = (newSize: number) => {
    const canvas = window.canvas;
    const active = canvas?.getActiveObject();

    if (active && active.type === "textbox") {
      const textbox = active as Textbox;
      textbox.set("fontSize", newSize);
      canvas.requestRenderAll();
      setFontSize(newSize);
    }
  };

  return (
    <div className="flex items-center gap-2 px-2 bg-white rounded-md shadow-sm border border-gray-300 h-[36px]">
      <button
        onClick={() => updateFontSize(Math.max(8, fontSize - 2))}
        className="text-gray-600 hover:text-black cursor-pointer"
      >
        <FiMinus size={16} />
      </button>

      <span className="min-w-[28px] text-center font-semibold">{fontSize}</span>

      <button
        onClick={() => updateFontSize(fontSize + 2)}
        className="text-gray-600 hover:text-black cursor-pointer"
      >
        <FiPlus size={16} />
      </button>
    </div>
  );
}
