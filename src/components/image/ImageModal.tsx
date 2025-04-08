import { useEffect, useState } from "react";
import ModalWrapper from "../common/ModalWrapper";
import { getImageList } from "../../api/image";
import { TGetImage } from "../../types/image";

export default function ImageModal({ onClose }: { onClose: () => void }) {
  const [images, setImages] = useState<TGetImage[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  /** 이미지 리스트 가져오기 */
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

  /** 현재 페이지에서 보여줄 이미지 12개 */
  const currentImages = images.slice((page - 1) * pageSize, page * pageSize);

  return (
    <ModalWrapper title="Upload Image" onClose={onClose}>
      <div className="grid grid-cols-4 gap-4 p-4 max-h-[500px] overflow-y-auto mb-4">
        {currentImages.map((img) => (
          <div
            key={img.imageId}
            className="border border-gray-300 p-2 rounded hover:shadow cursor-pointer"
          >
            <img
              src={`https://sol2-api.esls.io/images/T1/${img.imageId}.${img.extension}`}
              alt="img"
              className="w-full h-32 object-contain cursor-pointer"
              onError={(e) => (e.currentTarget.src = "../../assets/react.svg")}
            />
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-4 py-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="text-sm px-2 py-1 border border-gray-300 rounded cursor-pointer"
        >
          이전
        </button>
        <span className="text-sm">Page {page}</span>
        <button
          onClick={() =>
            setPage((p) =>
              p < Math.ceil(images.length / pageSize) ? p + 1 : p
            )
          }
          disabled={page >= Math.ceil(images.length / pageSize)}
          className="text-sm px-2 py-1 border  border-gray-300 rounded cursor-pointer "
        >
          다음
        </button>
      </div>
    </ModalWrapper>
  );
}
