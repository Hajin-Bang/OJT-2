import { HiPlus } from "react-icons/hi";

interface AddChoiceButtonProps {
  onClick?: () => void;
  visible?: boolean;
}

/** 선택된 요소를 Choice로 추가하는 + 버튼 */
export default function AddChoiceButton({
  onClick,
  visible = true,
}: AddChoiceButtonProps) {
  if (!visible || !onClick) return null;

  return (
    <button
      onClick={onClick}
      className="rounded-full border-[3px] border-green-600 text-green-600 w-8 h-8 flex items-center justify-center bg-white shadow-sm"
    >
      <HiPlus className="w-5 h-5" />
    </button>
  );
}
