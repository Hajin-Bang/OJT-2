interface ToolButtonProps {
  icon: React.ReactNode;
  label?: string;
  onClick: () => void;
}

/** 툴바 내부 버튼(아이콘) */
export default function ToolButton({ icon, label, onClick }: ToolButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-10 h-10 flex items-center justify-center rounded hover:bg-white"
    >
      <span>{icon}</span>

      {label && (
        <span
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 
                          text-md bg-gray-500 text-white rounded px-2 py-1 
                          opacity-0 group-hover:opacity-100 
                          pointer-events-none whitespace-nowrap z-10 transition"
        >
          {label}
        </span>
      )}
    </button>
  );
}
