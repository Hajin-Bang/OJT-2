import {
  FiSave,
  FiEye,
  FiType,
  FiSquare,
  FiCircle,
  FiBold,
  FiTrash2,
} from "react-icons/fi";
import ToolButton from "../Toolbutton";
import { addRect } from "../../canvas/handler/addRect";
import { addCircle } from "../../canvas/handler/addCircle";
import { addText } from "../../canvas/handler/addText";
import { FaSlash } from "react-icons/fa";
import { handleSave } from "../../canvas/handler/saveHandler";
import { handleGroup, handleUngroup } from "../../canvas/handler/groupHandlers";
import { HiMiniArrowsPointingOut, HiMiniSquares2X2 } from "react-icons/hi2";
import { handleDelete } from "../../canvas/handler/deleteHandler";
import BoxStyleDropdown from "./styleBox/BoxStyleDropdown";

/** Object에 상관 없이 기본적으로 뜨는 Toolbar */
export default function BasicToolGroup({
  onPreview,
}: {
  onPreview: () => void;
}) {
  return (
    <>
      <ToolButton
        icon={<FiSave size={23} />}
        label="Save"
        onClick={handleSave}
      />
      <ToolButton
        icon={<FiEye size={23} />}
        label="Preview"
        onClick={onPreview}
      />

      <div className="w-px h-6 bg-gray-300 mx-2" />

      <ToolButton icon={<FiType size={23} />} label="Text" onClick={addText} />
      <ToolButton
        icon={<FiSquare size={23} />}
        label="Rect"
        onClick={addRect}
      />
      <ToolButton
        icon={<FiCircle size={23} />}
        label="Circle"
        onClick={addCircle}
      />
      <ToolButton
        icon={<FaSlash size={23} />}
        label="Line"
        onClick={() => {}}
      />
      <ToolButton
        icon={<FiBold size={23} />}
        label="Main text"
        onClick={() => console.log("MainText")}
      />

      {/* 박스 스타일 드롭다운 */}
      <BoxStyleDropdown />

      <ToolButton
        icon={<FiTrash2 size={23} />}
        label="Delete"
        onClick={handleDelete}
      />
      <div className="w-px h-6 bg-gray-300 mx-2" />

      <ToolButton
        icon={<HiMiniSquares2X2 size={23} />}
        label="Group"
        onClick={handleGroup}
      />
      <ToolButton
        icon={<HiMiniArrowsPointingOut size={23} />}
        label="Ungroup"
        onClick={handleUngroup}
      />
    </>
  );
}
