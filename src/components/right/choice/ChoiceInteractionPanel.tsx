import { v4 as uuidv4 } from "uuid";
import { getCanvas } from "../../utils/canvas";
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
import { useChoiceStore } from "../../../store/useChoiceStore";
import { useInitializeChoiceData } from "../../hook/useInitializeChoiceData";

export default function ChoiceInteractionPanel() {
  useInitializeChoiceData();

  const selected = useSelectedCanvasObject();
  const { mode, setMode } = useChoiceModeStore();
  const showToast = useToastStore((s) => s.showToast);
  const { choices, addChoice, updateChoice, removeChoice } = useChoiceStore();

  /** 선택된 요소를 캡쳐해서 선택지로 추가 */
  const handleAddChoice = () => {
    const canvas = getCanvas();
    if (!selected) return;

    const isDuplicated = choices.some((c) => c.objectId === selected.id);
    if (isDuplicated) {
      showToast("이미 선택지에 추가된 요소입니다.", "error");
      return;
    }

    const dataUrl = captureSingleObject(canvas, selected);

    addChoice({
      id: uuidv4(),
      objectId: selected.id!,
      imageUrl: dataUrl,
      isAnswer: false,
    });
  };

  /** 정답 설정 로직 */
  const handleSetAnswer = (id: string, checked: boolean) => {
    if (mode === "unit") {
      choices.forEach((c) => {
        updateChoice(c.id, { isAnswer: c.id === id });
      });
    } else {
      updateChoice(id, { isAnswer: checked });
    }
  };

  /** 이미지 자동 갱신 */
  useChoiceImageUpdater(choices, (updated) => {
    updated.forEach(({ id, imageUrl }) => {
      updateChoice(id, { imageUrl });
    });
  });

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

      <div className="w-full">
        <div className="flex gap-4 items-center">
          {selected && <AddChoiceButton onClick={handleAddChoice} />}
          {choices.length === 0 ? (
            <EmptyBox />
          ) : (
            <div className="overflow-x-auto">
              <ChoiceList
                choices={choices}
                onDelete={(id) => removeChoice(id)}
                onSetAnswer={handleSetAnswer}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
