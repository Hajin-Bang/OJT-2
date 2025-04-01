/** 도형을 선택했을 때 보여줄 툴 */
import ToolButton from "../Toolbutton";
import { FaPaintBrush, FaFillDrip, FaSlash } from "react-icons/fa";

export default function ShapeToolGroup() {
  return (
    <>
      <ToolButton
        icon={<FaPaintBrush />}
        label="Stroke Width"
        onClick={() => {}}
      />
      <ToolButton icon={<FaSlash />} label="Stroke Style" onClick={() => {}} />
      <ToolButton icon={<FaFillDrip />} label="Fill Color" onClick={() => {}} />
    </>
  );
}
