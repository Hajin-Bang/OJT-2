import { useEffect, RefObject } from "react";

/** 드롭다운 외부 클릭을 감지하는 훅 */
export function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  onClose: () => void
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);
}
