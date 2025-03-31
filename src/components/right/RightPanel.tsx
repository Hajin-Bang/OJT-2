import InteractionSelect from "./InteractionSelect";
import ConditionalPanel from "./ConditionalPanel";

/** 오른쪽 패널 전체 */
export default function RightPanel() {
  return (
    <div className="w-full h-full pt-3 pl-5 pr-15 ">
      <InteractionSelect />
      <ConditionalPanel />
    </div>
  );
}
