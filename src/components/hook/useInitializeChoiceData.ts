import { useEffect } from "react";
import { useChoiceStore } from "../../store/useChoiceStore";
import { useChoiceModeStore } from "../../store/useChoiceModeStore";

/**
 * sessionStorage에 저장된 선택지 및 모드 데이터를 복원하는 훅
 * ChoiceInteractionPanel에 반영해 새로고침해도 보이도록
 *  */
export const useInitializeChoiceData = () => {
  const setChoices = useChoiceStore((s) => s.setChoices);
  const setMode = useChoiceModeStore((s) => s.setMode);

  useEffect(() => {
    const saved = sessionStorage.getItem("questionData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const interaction = parsed.interaction;

        if (interaction?.choices) {
          setChoices(interaction.choices);
        }

        if (interaction?.mode) {
          setMode(interaction.mode);
        }
      } catch (err) {
        console.error("Choice 데이터 복원 실패:", err);
      }
    }
  }, [setChoices, setMode]);
};
