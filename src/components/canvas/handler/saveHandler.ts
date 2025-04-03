import { getCanvas } from "../../utils/canvas";
import { useChoiceStore } from "../../../store/useChoiceStore";
import { useChoiceModeStore } from "../../../store/useChoiceModeStore";
import { useToastStore } from "../../../store/useToastStore";

/** 캔버스 및 Choice 데이터를 sessionStorage에 저장하는 handler */
export const handleSave = () => {
  const canvas = getCanvas();
  const canvasJSON = canvas.toJSON();

  const { choices } = useChoiceStore.getState();
  const { mode } = useChoiceModeStore.getState();
  const { showToast } = useToastStore.getState();

  const data = {
    elements: canvasJSON,
    interaction: {
      interactionType: "choice",
      mode,
      choices,
      sounds: {},
    },
  };

  sessionStorage.setItem("questionData", JSON.stringify(data));
  console.log(data);
  showToast("저장 완료!", "success");
};
