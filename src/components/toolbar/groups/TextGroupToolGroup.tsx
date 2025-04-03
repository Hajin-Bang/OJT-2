import {
  MdAlignHorizontalCenter,
  MdAlignVerticalCenter,
  MdAddBox,
} from "react-icons/md";
import ToolButton from "../Toolbutton";
import {
  handleAlignTextCenter,
  handleAlignTextHorizontal,
  handleAlignTextVertical,
} from "../../canvas/handler/alignTextHandler";

/** 요소가 text를 포함한 Group일 때 나타나는 추가 툴 */
export default function TextGroupToolGroup() {
  return (
    <>
      <ToolButton
        icon={<MdAlignHorizontalCenter size={23} />}
        label="Align Center (H)"
        onClick={handleAlignTextHorizontal}
      />
      <ToolButton
        icon={<MdAlignVerticalCenter size={23} />}
        label="Align Center (V)"
        onClick={handleAlignTextVertical}
      />
      <ToolButton
        icon={<MdAddBox size={23} />}
        label="Align Center (Both)"
        onClick={handleAlignTextCenter}
      />
    </>
  );
}
