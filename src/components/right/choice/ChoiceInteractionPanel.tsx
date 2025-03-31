import AddGroupButton from "./AddGroupButton";
import GroupSelector from "./GroupSelector";
import ToggleTab from "../../common/ToggleTab";
import EmptyBox from "../../common/EmptyBox";
import SectionTitle from "../../common/SectionTitle";
import { useChoiceTabStore } from "../../../store/useChoiceTabStore";
import { useState } from "react";

/** ChoiceInteractionPanel 전체 구성 */
export default function ChoiceInteractionPanel() {
  const { selectedTab, setSelectedTab } = useChoiceTabStore();
  const [unitType, setUnitType] = useState<"unit" | "multi">("unit");

  return (
    <div className="space-y-4 pt-2">
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

      {/* +Group + GroupSelector */}
      {selectedTab === "group" ? (
        <div className="flex justify-between items-center">
          <AddGroupButton onClick={() => {}} />
          <GroupSelector label="GROUP 1" onDelete={() => console.log("삭제")} />
        </div>
      ) : (
        <div className="flex justify-end">
          <GroupSelector label="GROUP 1" onDelete={() => console.log("삭제")} />
        </div>
      )}

      {/* SectionTitle + Unit/Multi 토글 */}
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
          value={unitType}
          onChange={(val) => setUnitType(val as "unit" | "multi")}
          size="sm"
        />
      </div>

      <EmptyBox text="No options data available" onAdd={() => {}} />
    </div>
  );
}
