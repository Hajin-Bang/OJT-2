import ModalWrapper from "../common/ModalWrapper";

export default function ImageModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalWrapper title="Upload Image" onClose={onClose}>
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-gray-600">이미지 업로드</p>
      </div>
    </ModalWrapper>
  );
}
