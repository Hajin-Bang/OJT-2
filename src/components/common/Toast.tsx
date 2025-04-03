import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useToastStore } from "../../store/useToastStore";

export default function Toast() {
  const { message, type, visible, hideToast } = useToastStore();
  const [shouldRender, setShouldRender] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setIsFading(false);

      const fadeOutTimer = setTimeout(() => {
        setIsFading(true);
      }, 2500);

      const removeTimer = setTimeout(() => {
        setShouldRender(false);
        hideToast();
      }, 3000);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [visible, hideToast]);

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={`
        fixed bottom-8 right-10
        px-6 py-4 min-w-[320px] max-w-[90%] text-white text-lg text-center
        rounded-xl shadow-lg
        ${
          isFading ? "opacity-0 transition-opacity duration-500" : "opacity-100"
        }
        ${type === "error" ? "bg-red-400" : "bg-green-500"}
      `}
    >
      {message}
    </div>,
    document.body
  );
}
