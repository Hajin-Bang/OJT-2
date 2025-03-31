import { create } from "zustand";

type ChoiceMode = "unit" | "multi";

/** 단일 / 다중 선택 상태 */
interface ChoiceModeState {
  mode: ChoiceMode;
  setMode: (mode: ChoiceMode) => void;
}

export const useChoiceModeStore = create<ChoiceModeState>((set) => ({
  mode: "unit",
  setMode: (mode) => set({ mode }),
}));
