import { useInteractionStore } from "../../store/useInteractionStore";
import ChoiceInteractionPanel from "./choice/ChoiceInteractionPanel";

/** 인터랙션 타입에 따른 화면 렌더링 */
export default function ConditionalPanel() {
  const { type } = useInteractionStore();

  if (type === "choice") return <ChoiceInteractionPanel />;
  return null;
}
