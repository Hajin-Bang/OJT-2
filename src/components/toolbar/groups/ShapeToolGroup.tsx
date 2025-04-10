import ToolButton from "../Toolbutton";
import { AiOutlineDash } from "react-icons/ai";
import StrokeWidthDropdown from "./shape/StrokeWidthDropdown";
import { getCanvas } from "../../utils/canvas";

/** 요소가 Shape일 때 나타나는 추가 툴 */
export default function ShapeToolGroup() {
  return (
    <>
      <StrokeWidthDropdown />
      <ToolButton
        icon={<AiOutlineDash size={25} />}
        label="Dashed"
        onClick={() => {
          const canvas = getCanvas();
          const active = canvas?.getActiveObject();
          if (!active) return;
          active.set(
            "strokeDashArray",
            active.strokeDashArray ? undefined : [10, 5]
          );
          canvas.renderAll();
          canvas.fire("object:modified", { target: active });
        }}
      />
    </>
  );
}
