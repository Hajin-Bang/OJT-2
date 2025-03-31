import {
  FiSave,
  FiEye,
  FiType,
  FiSquare,
  FiCircle,
  FiPenTool,
  FiBold,
  FiCheckSquare,
} from "react-icons/fi";
import ToolButton from "./Toolbutton";

/** 좌측 상단 툴바 */
export default function Toolbar() {
  return (
    <div className="flex items-center gap-3 h-full">
      <ToolButton
        icon={<FiSave size={23} />}
        label="Save"
        onClick={() => console.log("Save")}
      />
      <ToolButton
        icon={<FiEye size={23} />}
        label="Preview"
        onClick={() => console.log("Preview")}
      />

      <div className="w-px h-6 bg-gray-300 mx-2" />

      <ToolButton
        icon={<FiType size={23} />}
        label="Text"
        onClick={() => console.log("Text")}
      />
      <ToolButton
        icon={<FiSquare size={23} />}
        label="Rect"
        onClick={() => console.log("Rect")}
      />
      <ToolButton
        icon={<FiCircle size={23} />}
        label="Circle"
        onClick={() => console.log("Circle")}
      />
      <ToolButton
        icon={<FiPenTool size={23} />}
        label="Line"
        onClick={() => console.log("Line")}
      />
      <ToolButton
        icon={<FiBold size={23} />}
        label="Main text"
        onClick={() => console.log("MainText")}
      />
      <ToolButton
        icon={<FiCheckSquare size={23} />}
        label="Choice box"
        onClick={() => console.log("Choice")}
      />
    </div>
  );
}
