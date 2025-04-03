import { Choice } from "../../../../types/choice";
import ChoiceCard from "./ChoiceCard";

interface ChoiceListProps {
  choices: Choice[];
  onDelete: (id: string) => void;
  onToggleAnswer: (id: string) => void;
}

/** 선택지 카드 리스트 렌더링 */
export default function ChoiceList({
  choices,
  onDelete,
  onToggleAnswer,
}: ChoiceListProps) {
  return (
    <div className="flex gap-4">
      {choices.map((choice, idx) => (
        <ChoiceCard
          key={choice.id}
          index={idx + 1}
          imageUrl={choice.imageUrl}
          isAnswer={choice.isAnswer}
          objectId={choice.objectId}
          onDelete={() => onDelete(choice.id)}
          onToggleAnswer={() => onToggleAnswer(choice.id)}
        />
      ))}
    </div>
  );
}
