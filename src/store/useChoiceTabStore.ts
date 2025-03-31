import { create } from "zustand";

type ChoiceTabType = "choice" | "group";

/** Choice / GroupChoice 탭 상태 */
interface ChoiceTabState {
  selectedTab: ChoiceTabType;
  setSelectedTab: (tab: ChoiceTabType) => void;
}

export const useChoiceTabStore = create<ChoiceTabState>((set) => ({
  selectedTab: "choice",
  setSelectedTab: (tab) => set({ selectedTab: tab }),
}));
