import { useState } from "react";
import ToggleTab from "../../common/ToggleTab";
import EmptyBox from "../../common/EmptyBox";
import SectionTitle from "../../common/SectionTitle";
import AddChoiceButton from "../../common/AddChoiceButton";
import { useSelectedCanvasObject } from "../../hook/useSelectedCanvasObject";
import ChoiceList from "./cards/ChoiceList";
import { v4 as uuidv4 } from "uuid";
import { getCanvas } from "../../utils/canvas";
import { Choice } from "../../../types/choice";
import { useChoiceModeStore } from "../../../store/useChoiceModeStore";

/** ChoiceInteractionPanel 전체 구성 */
export default function ChoiceInteractionPanel() {
  const selected = useSelectedCanvasObject();
  const { mode, setMode } = useChoiceModeStore();

  const [choices, setChoices] = useState<Choice[]>([]);

  /** 선택된 캔버스 요소를 이미지로 캡처해서 Choice로 추가 */
  const handleAddChoice = () => {
    const canvas = getCanvas();
    if (!selected) return;

    const dataUrl = canvas.toDataURL({
      format: "png",
      left: selected.left,
      top: selected.top,
      width: selected.width,
      height: selected.height,
      multiplier: 1,
    });

    const newChoice: Choice = {
      id: uuidv4(),
      imageUrl: dataUrl,
      isAnswer: false,
    };

    setChoices((prev) => [...prev, newChoice]);
  };

  /** Choice 삭제 */
  const handleDeleteChoice = (choiceId: string) => {
    setChoices((prev) => prev.filter((c) => c.id !== choiceId));
  };

  /** Choice 정답 체크 상태 토글 */
  const handleToggleAnswer = (choiceId: string) => {
    setChoices((prev) =>
      prev.map((c) => (c.id === choiceId ? { ...c, isAnswer: !c.isAnswer } : c))
    );
  };

  return (
    <div className="space-y-6 pt-2">
      <div className="flex justify-between items-center">
        <SectionTitle title="Choice mode" />
        <ToggleTab
          tabs={[
            { label: "Unit", value: "unit" },
            { label: "Multi", value: "multi" },
          ]}
          value={mode}
          onChange={(val) => setMode(val as "unit" | "multi")}
          size="sm"
        />
      </div>

      <div className="flex items-center gap-4">
        {selected && <AddChoiceButton onClick={handleAddChoice} />}
        {choices.length === 0 ? (
          <EmptyBox />
        ) : (
          <ChoiceList
            choices={choices}
            onDelete={handleDeleteChoice}
            onToggleAnswer={handleToggleAnswer}
          />
        )}
      </div>
    </div>
  );
}
