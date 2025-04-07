import { useEffect, useRef } from "react";
import { Canvas, Textbox } from "fabric";
import { initializeCanvas } from "./handler/initializeCanvas";
import { createWrongCountDisplay } from "./WrongCountDisplay";
import { ChoiceInteraction } from "./interaction/ChoiceInteraction";
import { ActionButton } from "./ActionButton";
import { Choice } from "../../types/choice";
import { checkAnswers } from "./handler/checkAnswers";
import { createActionButtons } from "./handler/createActionButtons";

interface PreviewModalProps {
  onClose: () => void;
}

let previewCanvas: Canvas | null = null;

export default function PreviewModal({ onClose }: PreviewModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrongCountRef = useRef(0); /** 오답 횟수 추적 */
  const wrongDisplayRef = useRef<Textbox | null>(null); /** 오답 횟수 표시 */
  const maxTries = 3;

  const choiceInteractionRef = useRef<ChoiceInteraction | null>(null);
  const checkButtonRef = useRef<ActionButton | null>(null);

  useEffect(() => {
    const loadPreview = async () => {
      const saved = sessionStorage.getItem("questionData");
      if (!saved || !canvasRef.current) return;

      if (previewCanvas) {
        previewCanvas.dispose();
        previewCanvas = null;
      }

      const canvasEl = canvasRef.current;
      const canvas = initializeCanvas(canvasEl);
      previewCanvas = canvas;

      const parsed = JSON.parse(saved);
      await canvas.loadFromJSON(parsed.elements);

      /** 모든 오브젝트 비인터랙티브로 설정 */
      canvas.getObjects().forEach((obj) => {
        obj.selectable = false;
        obj.evented = false;
        obj.hasControls = false;
        obj.lockMovementX = true;
        obj.lockMovementY = true;
      });

      /** 오답 횟수 표시 UI 추가 */
      const wrongDisplay = createWrongCountDisplay(
        0,
        maxTries,
        canvas.getWidth()
      );
      canvas.add(wrongDisplay);
      wrongDisplayRef.current = wrongDisplay;

      /** ChoiceInteraction 초기화 */
      if (parsed.interaction?.interactionType === "choice") {
        const interaction = new ChoiceInteraction(
          canvas,
          parsed.interaction.choices,
          parsed.interaction.mode,
          (selectedSet) => {
            /** 선택지 선택 여부에 따라 채점 버튼 활성화 */
            checkButtonRef.current?.setDisabled(selectedSet.size === 0);
          }
        );
        choiceInteractionRef.current = interaction;
      }

      /** 채점 및 다음 버튼 생성 */
      const [checkButton] = createActionButtons(
        canvas,
        /** 채점 로직 */
        () => {
          const selected =
            choiceInteractionRef.current?.getSelectedAnswers() ?? [];
          const choices: Choice[] = parsed.interaction.choices;
          const currentWrong = wrongCountRef.current;

          /** 정답 포함 여부 확인 */
          const gotCorrect = selected.some((id) =>
            choices.find((c: Choice) => c.objectId === id && c.isAnswer)
          );

          /** 채점 수행 */
          checkAnswers(
            canvas,
            choices,
            selected,
            () => {
              wrongCountRef.current += 1;
              wrongDisplayRef.current?.set(
                "text",
                `틀린 횟수: ${wrongCountRef.current} / ${maxTries}`
              );
              canvas.requestRenderAll();
            },
            gotCorrect || currentWrong + 1 === maxTries
          );

          /** 정답이거나 마지막 시도라면 버튼 비활성화 */
          checkButton.setDisabled(true);
        },
        /** 다음 문제 버튼 동작 */
        () => alert("다음 문제")
      );

      checkButtonRef.current = checkButton;
    };

    requestAnimationFrame(() => loadPreview());

    return () => {
      previewCanvas?.dispose();
      previewCanvas = null;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center">
      <div className="relative bg-white w-[850px] max-w-full rounded-xl shadow-lg p-6 pb-20">
        <h2 className="text-xl font-bold text-green-700 mb-4">Preview</h2>
        <div className="border border-gray-300 mx-auto">
          <canvas ref={canvasRef} width={800} height={550} />
        </div>
        <button
          onClick={onClose}
          className="absolute bottom-6 right-6 px-4 py-2 border border-gray-100 hover:bg-gray-200 rounded cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
