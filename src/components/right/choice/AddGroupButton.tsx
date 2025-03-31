interface AddGroupButtonProps {
  onClick: () => void;
}

/** Group 추가 버튼 */
export default function AddGroupButton({ onClick }: AddGroupButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-green-300 hover:bg-green-500 text-white px-4 py-2 rounded-md text-[15px] shadow-sm"
    >
      + GROUP
    </button>
  );
}
