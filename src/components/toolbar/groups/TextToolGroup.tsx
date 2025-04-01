/** 텍스트 선택 시 추가로 보여지는 툴 */
import ToolButton from "../Toolbutton";
import { FiItalic } from "react-icons/fi";
import { toggleItalic } from "../../canvas/handler/textHandlers";
import TextAlignDropdown from "./text/TextAlignDropdown";
import FontSizeControl from "./text/FontSizeControl";

/** 요소가 Text일 경우 나타나는 추가 툴 */
export default function TextToolGroup() {
  return (
    <>
      <ToolButton
        icon={<FiItalic size={22} />}
        label="Italic"
        onClick={toggleItalic}
      />
      <TextAlignDropdown />
      <FontSizeControl />
    </>
  );
}
