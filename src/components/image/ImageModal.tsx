// src/modals/ImageModal.tsx
import { useEffect, useState } from "react";
import ModalWrapper from "../common/ModalWrapper";
import { getImageList } from "../../api/image";
import { TGetImage } from "../../types/image";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { Canvas } from "fabric";
import { addImage } from "../canvas/handler/addImage";

interface ImageModalProps {
  onClose: () => void;
  canvas: Canvas;
}

export default function ImageModal({ onClose, canvas }: ImageModalProps) {
  const [images, setImages] = useState<TGetImage[]>([]);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const pageSize = 12;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await getImageList();
        setImages(result);
      } catch (error) {
        console.error("이미지 불러오기 실패:", error);
      }
    };
    fetchImages();
  }, []);

  const selectedImage = images.find((i) => i.imageId === selectedId);
  const imageUrl = selectedImage
    ? `https://sol2-api.esls.io/images/T1/${selectedImage.imageId}.${selectedImage.extension}`
    : null;

  const currentImages = images.slice((page - 1) * pageSize, page * pageSize);

  return (
    <ModalWrapper
      title="Upload Image"
      onClose={onClose}
      footer={
        <button
          onClick={() => {
            if (!selectedId || !imageUrl) return;
            addImage(canvas, imageUrl);
            onClose();
          }}
          className="px-4 py-2 border border-gray-100 hover:bg-gray-200 rounded cursor-pointer text-green-700"
        >
          Add
        </button>
      }
    >
      <div className="grid grid-cols-4 gap-4 p-4 max-h-[500px] overflow-y-auto mb-4">
        {currentImages.map((img) => {
          const isSelected = img.imageId === selectedId;
          return (
            <div
              key={img.imageId}
              onClick={() => setSelectedId(img.imageId)}
              className={`border-2 p-3 rounded cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "border-green-400 bg-green-50"
                  : "border-gray-200 hover:shadow"
              }`}
            >
              <img
                src={`https://sol2-api.esls.io/images/T1/${img.imageId}.${img.extension}`}
                alt="img"
                className="w-full h-32 object-contain"
                onError={(e) =>
                  (e.currentTarget.src = "../../assets/react.svg")
                }
              />
            </div>
          );
        })}
      </div>

      {/* 페이지네이션 */}
      <div className="absolute bottom-7 left-0 w-full flex justify-center items-center gap-2">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-30"
        >
          <FiChevronsLeft size={18} />
        </button>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-30"
        >
          <FiChevronLeft size={18} />
        </button>
        <span className="text-sm text-gray-600 px-2">
          Page {page} of {Math.ceil(images.length / pageSize) || 1}
        </span>
        <button
          onClick={() =>
            setPage((p) =>
              p < Math.ceil(images.length / pageSize) ? p + 1 : p
            )
          }
          disabled={page >= Math.ceil(images.length / pageSize)}
          className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-30"
        >
          <FiChevronRight size={18} />
        </button>
        <button
          onClick={() => setPage(Math.ceil(images.length / pageSize))}
          disabled={page >= Math.ceil(images.length / pageSize)}
          className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-30"
        >
          <FiChevronsRight size={18} />
        </button>
      </div>
      <div className="h-5" />
    </ModalWrapper>
  );
}
