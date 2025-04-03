import { FiTrash } from "react-icons/fi";

interface ChoiceCardProps {
  index: number;
  imageUrl: string;
  isAnswer: boolean;
  onDelete: () => void;
  onToggleAnswer: () => void;
}

/** 선택지 카드 */
export default function ChoiceCard({
  index,
  imageUrl,
  isAnswer,
  onDelete,
  onToggleAnswer,
}: ChoiceCardProps) {
  return (
    <div className="relative w-[230px] h-[270px] bg-white rounded-xl shadow">
      {/* 번호 뱃지 */}
      <div className="absolute top-2 left-2 bg-gray-400 text-white text-xs px-2 py-1 rounded-md">
        {index}
      </div>

      {/* 삭제 버튼 */}
      <button
        className="absolute top-2.5 right-2 text-gray-600 hover:text-red-500 cursor-pointer"
        onClick={onDelete}
      >
        <FiTrash className="w-5 h-5" />
      </button>

      {/* 이미지 미리보기 */}
      <div className=" w-[160px] h-[170px] flex items-center justify-center overflow-hidden mt-10 mx-auto bg-white">
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
        <label className="text-lg flex items-center gap-2 text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={isAnswer}
            onChange={onToggleAnswer}
            className="cursor-pointer w-5 h-5"
          />
          ANSWER
        </label>
      </div>
    </div>
  );
}
