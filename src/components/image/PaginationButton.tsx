import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

interface PaginationButtonProps {
  direction: "left" | "right" | "first" | "last";
  onClick: () => void;
  disabled: boolean;
}

const PaginationButton = ({
  direction,
  onClick,
  disabled,
}: PaginationButtonProps) => {
  const renderIcon = () => {
    switch (direction) {
      case "first":
        return <FiChevronsLeft size={18} />;
      case "left":
        return <FiChevronLeft size={18} />;
      case "right":
        return <FiChevronRight size={18} />;
      case "last":
        return <FiChevronsRight size={18} />;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-2 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer disabled:cursor-default disabled:text-gray-400 disabled:border-gray-200"
    >
      {renderIcon()}
    </button>
  );
};

export default PaginationButton;
