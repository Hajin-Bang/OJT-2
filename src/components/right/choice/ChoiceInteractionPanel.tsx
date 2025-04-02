import { useState } from "react";
import AddGroupButton from "./AddGroupButton";
import GroupSelector from "./GroupSelector";
import ToggleTab from "../../common/ToggleTab";
import EmptyBox from "../../common/EmptyBox";
import SectionTitle from "../../common/SectionTitle";
import AddChoiceButton from "../../common/AddChoiceButton";
import { useChoiceTabStore } from "../../../store/useChoiceTabStore";
import { useSelectedCanvasObject } from "../../hook/useSelectedCanvasObject";
import ChoiceList from "./cards/ChoiceList";
import { v4 as uuidv4 } from "uuid";

interface Choice {
  id: string;
  imageUrl: string;
  isAnswer: boolean;
}

type UnitType = "unit" | "multi";

interface GroupBlock {
  id: number;
  unitType: UnitType;
  choices: Choice[];
}

/** ChoiceInteractionPanel 전체 구성 */
export default function ChoiceInteractionPanel() {
  const { selectedTab, setSelectedTab } = useChoiceTabStore();
  const selected = useSelectedCanvasObject();

  const [groups, setGroups] = useState<GroupBlock[]>([
    {
      id: Date.now(),
      unitType: "unit",
      choices: [],
    },
  ]);

  /** 그룹 추가 */
  const handleAddGroup = () => {
    setGroups((prev) => [
      ...prev,
      {
        id: Date.now(),
        unitType: "unit",
        choices: [],
      },
    ]);
  };

  /** 그룹 삭제 */
  const handleDeleteGroup = (id: number) => {
    if (groups.length === 1) return;
    setGroups((prev) => prev.filter((group) => group.id !== id));
  };

  /** Unit / Multi 전환 */
  const handleUnitTypeChange = (id: number, value: UnitType) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === id ? { ...group, unitType: value } : group
      )
    );
  };

  /** 선택된 캔버스 요소를 이미지로 캡처해서 Choice로 추가 */
  const handleAddChoice = (groupId: number) => {
    const canvas = window.canvas;
    if (!canvas || !selected) return;

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

    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? { ...group, choices: [...group.choices, newChoice] }
          : group
      )
    );
  };

  /** Choice 삭제 */
  const handleDeleteChoice = (groupId: number, choiceId: string) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              choices: group.choices.filter((c) => c.id !== choiceId),
            }
          : group
      )
    );
  };

  /** Choice 정답 체크 상태 토글 */
  const handleToggleAnswer = (groupId: number, choiceId: string) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              choices: group.choices.map((c) =>
                c.id === choiceId ? { ...c, isAnswer: !c.isAnswer } : c
              ),
            }
          : group
      )
    );
  };

  return (
    <div className="space-y-6 pt-2">
      <ToggleTab
        tabs={[
          { label: "Choice", value: "choice" },
          { label: "GroupChoice", value: "group" },
        ]}
        value={selectedTab}
        onChange={(val) => setSelectedTab(val as "choice" | "group")}
        size="lg"
      />

      {selectedTab === "group" && (
        <div className="flex justify-start">
          <AddGroupButton onClick={handleAddGroup} />
        </div>
      )}

      {groups.map((group, idx) => (
        <div key={group.id} className="space-y-3">
          <div className="flex justify-end">
            <GroupSelector
              label={`GROUP ${idx + 1}`}
              onDelete={() => handleDeleteGroup(group.id)}
            />
          </div>

          <div className="flex justify-between items-center">
            {selectedTab === "choice" ? (
              <SectionTitle title="Choice mode" />
            ) : (
              <div />
            )}
            <ToggleTab
              tabs={[
                { label: "Unit", value: "unit" },
                { label: "Multi", value: "multi" },
              ]}
              value={group.unitType}
              onChange={(val) =>
                handleUnitTypeChange(group.id, val as UnitType)
              }
              size="sm"
            />
          </div>

          {/* Choice 추가 영역 */}
          <div className="flex items-center gap-4">
            {selected && (
              <AddChoiceButton onClick={() => handleAddChoice(group.id)} />
            )}
            {group.choices.length === 0 ? (
              <EmptyBox />
            ) : (
              <ChoiceList
                choices={group.choices}
                onDelete={(choiceId) => handleDeleteChoice(group.id, choiceId)}
                onToggleAnswer={(choiceId) =>
                  handleToggleAnswer(group.id, choiceId)
                }
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
