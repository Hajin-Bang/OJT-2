interface GroupSelectorProps {
  label: string;
  onDelete?: () => void;
}

export default function GroupSelector({ label, onDelete }: GroupSelectorProps) {
  return (
    <div className="relative flex items-center bg-white rounded-md border border-gray-300 px-3 h-[45px] pr-9">
      <span className="font-extrabold text-[16px] text-gray-500 whitespace-nowrap">
        {label}
      </span>
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-2.4 right-2 text-[25px] font-semibold text-gray-500 hover:text-red-500"
        >
          &times;
        </button>
      )}
    </div>
  );
}
