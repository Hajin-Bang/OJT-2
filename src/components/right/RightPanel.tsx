import InteractionSelect from "./InteractionSelect";
import ConditionalPanel from "./ConditionalPanel";
import { useInteractionStore } from "../../store/useInteractionStore";

/** 오른쪽 패널 전체 */
export default function RightPanel() {
  const interactionType = useInteractionStore((s) => s.type);

  return (
    <div
      className={
        interactionType === "choice"
          ? "w-full h-full pt-3 pl-5 pr-15 mt-10"
          : "w-full h-full pt-3 pl-5 pr-15"
      }
    >
      <InteractionSelect />
      <div className="mt-10">
        <ConditionalPanel />
      </div>
    </div>
  );
}
