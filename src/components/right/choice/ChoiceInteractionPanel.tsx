import { useState } from "react";
import AddGroupButton from "./AddGroupButton";
import GroupSelector from "./GroupSelector";
import ToggleTab from "../../common/ToggleTab";
import EmptyBox from "../../common/EmptyBox";
import SectionTitle from "../../common/SectionTitle";
import { useChoiceTabStore } from "../../../store/useChoiceTabStore";

type UnitType = "unit" | "multi";

interface GroupBlock {
  id: number;
  unitType: UnitType;
}

/** ChoiceInteractionPanel 전체 구성 */
export default function ChoiceInteractionPanel() {
  const { selectedTab, setSelectedTab } = useChoiceTabStore();

  /** 그룹 상태
   * 최소 1개는 존재
   * */
  const [groups, setGroups] = useState<GroupBlock[]>([
    { id: Date.now(), unitType: "unit" },
  ]);

  /** 그룹 추가 함수 */
  const handleAddGroup = () => {
    setGroups((prev) => [...prev, { id: Date.now(), unitType: "unit" }]);
  };

  /** 그룹 삭제 함수 */
  const handleDeleteGroup = (id: number) => {
    if (groups.length === 1) return;
    setGroups((prev) => prev.filter((group) => group.id !== id));
  };

  /** unit/multi 상태 변경 */
  const handleUnitTypeChange = (id: number, value: UnitType) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === id ? { ...group, unitType: value } : group
      )
    );
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Choice / GroupChoice 탭 */}
      <ToggleTab
        tabs={[
          { label: "Choice", value: "choice" },
          { label: "GroupChoice", value: "group" },
        ]}
        value={selectedTab}
        onChange={(val) => setSelectedTab(val as "choice" | "group")}
        size="lg"
      />

      {/* +GROUP 버튼은 GroupChoice일 때 한 번만 표시 */}
      {selectedTab === "group" && (
        <div className="flex justify-start">
          <AddGroupButton onClick={handleAddGroup} />
        </div>
      )}

      {/* 그룹 묶음 렌더링 */}
      {groups.map((group, idx) => (
        <div key={group.id} className="space-y-3">
          {/* GroupSelector */}
          <div className="flex justify-end">
            <GroupSelector
              label={`GROUP ${idx + 1}`}
              onDelete={() => handleDeleteGroup(group.id)}
            />
          </div>

          {/* Title + unit/multi 토글 */}
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

          {/* Empty 상태 */}
          <EmptyBox />
        </div>
      ))}
    </div>
  );
}
