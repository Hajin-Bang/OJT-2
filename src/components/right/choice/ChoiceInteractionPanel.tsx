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

export default function ChoiceInteractionPanel() {
  const selected = useSelectedCanvasObject();
  const { mode, setMode } = useChoiceModeStore();
  const [choices, setChoices] = useState<Choice[]>([]);

  /** 선택된 객체만 캡처해서 Choice 추가 */
  const handleAddChoice = () => {
    const canvas = getCanvas();
    if (!selected) return;

    const dataUrl = captureSingleObject(canvas, selected);

    const newChoice: Choice = {
      id: uuidv4(),
      objectId: selected.id!,
      imageUrl: dataUrl,
      isAnswer: false,
    };

    setChoices((prev) => [...prev, newChoice]);
  };

  useChoiceImageUpdater(choices, setChoices);
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
            onToggleAnswer={(id) =>
              setChoices((prev) =>
                prev.map((c) =>
                  c.id === id ? { ...c, isAnswer: !c.isAnswer } : c
                )
              )
            }
          />
        )}
      </div>
    </div>
  );
}
