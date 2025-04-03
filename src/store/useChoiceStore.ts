import { create } from "zustand";
import { Choice } from "../types/choice";

interface ChoiceStore {
  choices: Choice[];
  setChoices: (choices: Choice[]) => void;
  addChoice: (choice: Choice) => void;
  updateChoice: (id: string, updated: Partial<Choice>) => void;
  removeChoice: (id: string) => void;
  resetChoices: () => void;
}

/** 오른쪽 패널에서 사용되는 선택지 상태 */
export const useChoiceStore = create<ChoiceStore>((set) => ({
  choices: [],
  /** 선택지를 통째로 설정 (불러오기 시 사용) */
  setChoices: (choices) => set({ choices }),
  /** 선택지 하나 추가 */
  addChoice: (choice) =>
    set((state) => ({ choices: [...state.choices, choice] })),
  /** 특정 선택지 수정 */
  updateChoice: (id, updated) =>
    set((state) => ({
      choices: state.choices.map((c) =>
        c.id === id ? { ...c, ...updated } : c
      ),
    })),
  /** 선택지 하나 삭제 */
  removeChoice: (id) =>
    set((state) => ({
      choices: state.choices.filter((c) => c.id !== id),
    })),
  /** 선택지 전체 초기화 */
  resetChoices: () => set({ choices: [] }),
}));
