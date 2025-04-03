import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getCanvas } from "../../utils/canvas";
import { Choice } from "../../../types/choice";
import { useChoiceModeStore } from "../../../store/useChoiceModeStore";
import { useSelectedCanvasObject } from "../../hook/useSelectedCanvasObject";
import ToggleTab from "../../common/ToggleTab";
import SectionTitle from "../../common/SectionTitle";
import AddChoiceButton from "../../common/AddChoiceButton";
import EmptyBox from "../../common/EmptyBox";
import ChoiceList from "./cards/ChoiceList";
import { useChoiceImageUpdater } from "../../hook/useChoiceImageUpdater";
import { captureSingleObject } from "../../utils/capture";
import { useCanvasSelectionSync } from "../../hook/useCanvasSelectionSync";
import { useToastStore } from "../../../store/useToastStore";

export default function ChoiceInteractionPanel() {
  const selected = useSelectedCanvasObject();
  const { mode, setMode } = useChoiceModeStore();
  const [choices, setChoices] = useState<Choice[]>([]);
  const showToast = useToastStore((s) => s.showToast);

  /** 선택된 요소를 캡쳐해서 선택지로 추가 */
  const handleAddChoice = () => {
    const canvas = getCanvas();
    if (!selected) return;

    /** 중복 요소 방지 */
    const isDuplicated = choices.some((c) => c.objectId === selected.id);
    if (isDuplicated) {
      showToast("이미 선택지에 추가된 요소입니다.", "error");
      return;
    }

    const dataUrl = captureSingleObject(canvas, selected);

    const newChoice: Choice = {
      id: uuidv4(),
      objectId: selected.id!,
      imageUrl: dataUrl,
      isAnswer: false,
    };

    setChoices((prev) => [...prev, newChoice]);
  };

  /**
   * 정답 설정 로직
   * 단일/다중 선택에 따라서 구분
   */
  const handleSetAnswer = (id: string, checked: boolean) => {
    if (mode === "unit") {
      setChoices((prev) => prev.map((c) => ({ ...c, isAnswer: c.id === id })));
    } else {
      setChoices((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isAnswer: checked } : c))
      );
    }
  };

  /** 선택 요소 수정 시 Choice 이미지 자동 갱신 */
  useChoiceImageUpdater(choices, setChoices);
  /** 캔버스 선택 요소 - ChoiceCard 요소 동기화 */
  useCanvasSelectionSync();

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
            onDelete={(id) =>
              setChoices((prev) => prev.filter((c) => c.id !== id))
            }
            onSetAnswer={handleSetAnswer}
          />
        )}
      </div>
    </div>
  );
}
