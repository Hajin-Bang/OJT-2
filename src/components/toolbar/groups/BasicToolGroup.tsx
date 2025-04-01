import {
  FiSave,
  FiEye,
  FiType,
  FiSquare,
  FiCircle,
  FiBold,
  FiCheckSquare,
} from "react-icons/fi";
import ToolButton from "../Toolbutton";
import { addRect } from "../../canvas/handler/addRect";
import { addCircle } from "../../canvas/handler/addCircle";
import { addText } from "../../canvas/handler/addText";
import { FaSlash } from "react-icons/fa";

/** Object에 상관 없이 기본적으로 뜨는 Toolbar */
export default function BasicToolGroup() {
  return (
    <>
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
      <ToolButton
        icon={<FiCheckSquare size={23} />}
        label="Choice"
        onClick={() => console.log("Choice")}
      />
    </>
  );
}
