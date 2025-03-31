import InteractionSelect from "./InteractionSelect";
import ConditionalPanel from "./ConditionalPanel";

/** 오른쪽 패널 전체 */
export default function RightPanel() {
  return (
    <div className="w-full h-full p-6">
      <InteractionSelect />
      <ConditionalPanel />
    </div>
  );
}
