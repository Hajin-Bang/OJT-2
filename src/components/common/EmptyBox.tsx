import { HiPlus } from "react-icons/hi";
interface EmptyBoxProps {
  text: string;
  onAdd?: () => void;
}

/** 데이터 없을 때 나오는 box */
export default function EmptyBox({ text, onAdd }: EmptyBoxProps) {
  return (
    <div className="relative pl-10">
      {/* + 버튼 */}
      {onAdd && (
        <button
          onClick={onAdd}
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border-[3px] border-green-600 text-green-600 w-8 h-8 flex items-center justify-center bg-white shadow-sm"
        >
          <HiPlus className="w-5 h-5" />
        </button>
      )}
      {/* 박스 */}
      <div className="bg-white border-1 border-dashed border-gray-400 rounded-2xl px-6 py-12 text-center text-gray-500 h-[200px] flex items-center justify-center">
        {text}
      </div>
    </div>
  );
}
