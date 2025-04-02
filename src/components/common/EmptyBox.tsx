interface EmptyBoxProps {
  text?: string;
  height?: string;
}

/** 데이터 없을 때 나오는 box  */
export default function EmptyBox({
  text = "No data available",
  height = "h-[200px]",
}: EmptyBoxProps) {
  return (
    <div
      className={`flex-1 bg-white border-1 border-dashed border-gray-400 rounded-2xl px-6 py-12 text-center text-gray-500 flex items-center justify-center ${height}`}
    >
      {text}
    </div>
  );
}
