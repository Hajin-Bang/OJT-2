import { FiTrash } from "react-icons/fi";
import { useChoiceSelectionStore } from "../../../../store/useChoiceSelectionStore";
import { getCanvas } from "../../../utils/canvas";

interface ChoiceCardProps {
  index: number;
  imageUrl: string;
  isAnswer: boolean;
  objectId: string;
  onDelete: () => void;
  onSetAnswer: (checked: boolean) => void;
}

/** 선택지 카드 */
export default function ChoiceCard({
  index,
  imageUrl,
  isAnswer,
  objectId,
  onDelete,
  onSetAnswer,
}: ChoiceCardProps) {
  const { selectedChoiceId, setSelectedChoiceId } = useChoiceSelectionStore();

  /** 카드 클릭 시 해당 요소를 캔버스에서 선택 상태로 설정 */
  const handleSelect = () => {
    const canvas = getCanvas();
    const target = canvas.getObjects().find((obj) => obj.id === objectId);

    if (target) {
      canvas.setActiveObject(target);
      canvas.renderAll();
      setSelectedChoiceId(objectId);
    }
  };

  const isSelected = selectedChoiceId === objectId;

  return (
    <div
      className={`relative w-[230px] h-[270px] rounded-xl shadow cursor-pointer transition-all border-3 bg-white ${
        isSelected ? "border-green-500" : "border-transparent"
      }`}
      onClick={handleSelect}
    >
      {/* 번호 뱃지 */}
      <div className="absolute top-2 left-2 bg-gray-400 text-white text-xs px-2 py-1 rounded-md">
        {index}
      </div>

      {/* 삭제 버튼 */}
      <button
        className="absolute top-2.5 right-2 text-gray-600 hover:text-red-500 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <FiTrash className="w-5 h-5" />
      </button>

      {/* 이미지 미리보기 */}
      <div className="w-[160px] h-[170px] flex items-center justify-center overflow-hidden mt-10 mx-auto bg-white">
        <img
          src={imageUrl}
          alt="preview"
          className="max-w-full max-h-full object-contain mx-auto my-auto"
        />
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-200 my-2 w-[90%] mx-auto mt-3" />

      {/* 정답 체크 */}
      <div className="flex justify-center mt-3 cursor-pointer">
        <label className="text-lg flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={isAnswer}
            onChange={(e) => {
              e.stopPropagation();
              onSetAnswer(e.target.checked);
            }}
            className="w-5 h-5 cursor-pointer"
          />
          ANSWER
        </label>
      </div>
    </div>
  );
}
