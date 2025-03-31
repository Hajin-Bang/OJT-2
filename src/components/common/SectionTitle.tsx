interface SectionTitleProps {
  title: string;
}

/** 섹션별 정보 (title) */
export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-1 h-10 bg-gray-300 rounded-sm" />
      <h3 className="text-lg font-bold text-black">{title}</h3>
    </div>
  );
}
