import { create } from "zustand";

interface ToastState {
  message: string;
  type: "success" | "error";
  visible: boolean;
  showToast: (msg: string, type: "success" | "error") => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  type: "success",
  visible: false,
  showToast: (msg, type) => set({ message: msg, type, visible: true }),
  hideToast: () => set({ visible: false }),
}));
