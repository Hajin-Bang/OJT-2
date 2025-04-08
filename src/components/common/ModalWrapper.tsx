interface ModalWrapperProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

/** Modal 공통 UI */
export default function ModalWrapper({
  title,
  onClose,
  children,
}: ModalWrapperProps) {
  return (
    <div className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center">
      <div className="relative bg-white w-[850px] max-w-full rounded-xl shadow-lg p-6 pb-20">
        <h2 className="text-xl font-bold text-green-700 mb-4">{title}</h2>
        {children}
        <button
          onClick={onClose}
          className="absolute bottom-6 right-6 px-4 py-2 border border-gray-100 hover:bg-gray-200 rounded cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
