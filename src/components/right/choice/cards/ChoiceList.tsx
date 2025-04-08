import { Choice } from "../../../../types/choice";
import ChoiceCard from "./ChoiceCard";

interface ChoiceListProps {
  choices: Choice[];
  onDelete: (id: string) => void;
  onSetAnswer: (id: string, checked: boolean) => void;
}

/** 선택지 카드 리스트 렌더링 */
export default function ChoiceList({
  choices,
  onDelete,
  onSetAnswer,
}: ChoiceListProps) {
  return (
    <div className="overflow-x-auto  max-w-[calc(100vw-950px)] pb-4">
      <div className="flex gap-4 w-max">
        {choices.map((choice, idx) => (
          <ChoiceCard
            key={choice.id}
            index={idx + 1}
            imageUrl={choice.imageUrl}
            isAnswer={choice.isAnswer}
            objectId={choice.objectId}
            onDelete={() => onDelete(choice.id)}
            onSetAnswer={(checked) => onSetAnswer(choice.id, checked)}
          />
        ))}
      </div>
    </div>
  );
}
