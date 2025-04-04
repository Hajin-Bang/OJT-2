/** 텍스트 선택 시 추가로 보여지는 툴 */
import ToolButton from "../Toolbutton";
import { FiBold, FiItalic } from "react-icons/fi";
import { toggleBold, toggleItalic } from "../../canvas/handler/textHandlers";
import TextAlignDropdown from "./text/TextAlignDropdown";
import FontSizeControl from "./text/FontSizeControl";
import FontFamilyDropdown from "./text/FontFamilyDropdown";

/** 요소가 Text일 경우 나타나는 추가 툴 */
export default function TextToolGroup() {
  return (
    <>
      <FontFamilyDropdown />
      <ToolButton
        icon={<FiBold size={22} />}
        label="Bold"
        onClick={toggleBold}
      />
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
