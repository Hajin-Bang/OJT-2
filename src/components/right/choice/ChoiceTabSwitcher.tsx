import ToggleTab from "../../common/ToggleTab";
import { useChoiceTabStore } from "../../../store/useChoiceTabStore";

export default function ChoiceTabSwitcher() {
  const { selectedTab, setSelectedTab } = useChoiceTabStore();

  return (
    <ToggleTab
      tabs={[
        { label: "Choice", value: "choice" },
        { label: "GroupChoice", value: "group" },
      ]}
      value={selectedTab}
      onChange={setSelectedTab}
      size="lg"
    />
  );
}
