import { create } from "zustand";
import { Choice } from "../types/choice";

interface ChoiceStore {
  choices: Choice[];
  version: number /** 리렌더링 */;
  setChoices: (choices: Choice[]) => void;
  addChoice: (choice: Choice) => void;
  updateChoice: (id: string, updated: Partial<Choice>) => void;
  removeChoice: (objectId: string) => void;
  resetChoices: () => void;
}

export const useChoiceStore = create<ChoiceStore>((set) => ({
  choices: [],
  version: 0,

  /** 상태 강제 갱신 */
  setChoices: (choices) => set(() => ({ choices, version: Date.now() })),

  addChoice: (choice) =>
    set((state) => ({
      choices: [...state.choices, choice],
      version: Date.now(),
    })),

  updateChoice: (id, updated) =>
    set((state) => ({
      choices: state.choices.map((c) =>
        c.id === id ? { ...c, ...updated } : c
      ),
      version: Date.now(),
    })),

  removeChoice: (objectId) =>
    set((state) => ({
      choices: state.choices.filter((c) => c.objectId !== objectId),
      version: Date.now(),
    })),

  resetChoices: () => set({ choices: [], version: Date.now() }),
}));
