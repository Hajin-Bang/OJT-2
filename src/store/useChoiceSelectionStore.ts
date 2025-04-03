import { create } from "zustand";

interface ChoiceSelectionState {
  selectedChoiceId: string | null;
  setSelectedChoiceId: (id: string | null) => void;
}

/** ChoiceCard(요소) 선택 상태 */
export const useChoiceSelectionStore = create<ChoiceSelectionState>((set) => ({
  selectedChoiceId: null,
  setSelectedChoiceId: (id) => set({ selectedChoiceId: id }),
}));
