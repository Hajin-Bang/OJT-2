import { create } from "zustand";

type InteractionType = "choice" | "match";

/** Interaction 상태 */
interface InteractionState {
  type: InteractionType;
  setType: (type: InteractionType) => void;
}

export const useInteractionStore = create<InteractionState>((set) => ({
  type: "choice",

  setType: (type) => set({ type }),
}));
