import { useChoiceStore } from "../../../../store/useChoiceStore";
import ChoiceCard from "./ChoiceCard";

export default function ChoiceList() {
  const choices = useChoiceStore((state) => state.choices);
  const removeChoice = useChoiceStore((state) => state.removeChoice);
  const updateChoice = useChoiceStore((state) => state.updateChoice);

  return (
    <div className="overflow-x-auto max-w-[calc(100vw-950px)] pb-4">
      <div className="flex gap-4 w-max">
        {choices.map((choice, idx) => (
          <ChoiceCard
            key={choice.id}
            index={idx + 1}
            imageUrl={choice.imageUrl}
            isAnswer={choice.isAnswer}
            objectId={choice.objectId}
            onDelete={() => removeChoice(choice.id)}
            onSetAnswer={(checked) =>
              updateChoice(choice.id, { isAnswer: checked })
            }
          />
        ))}
      </div>
    </div>
  );
}
