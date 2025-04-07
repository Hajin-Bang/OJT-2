import { useEffect, useRef } from "react";
import { Canvas, Textbox } from "fabric";
import { ActionButton } from "./ActionButton";
import { ChoiceInteraction } from "./interactions/ChoiceInteraction";
import { checkAnswers } from "./interactions/checkAnswers";
import { createWrongCountDisplay } from "./WrongCountDisplay";
import { Choice } from "../../types/choice";

interface PreviewModalProps {
  onClose: () => void;
}

let previewCanvas: Canvas | null = null;

/** 모든 인터랙션 비활성화 */
const disableInteractions = (canvas: Canvas) => {
  canvas.getObjects().forEach((obj) => {
    obj.selectable = false;
    obj.evented = false;
    obj.hasControls = false;
    obj.lockMovementX = true;
    obj.lockMovementY = true;
  });
};

export default function PreviewModal({ onClose }: PreviewModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const wrongCountRef = useRef(0);
  const wrongDisplayRef = useRef<Textbox | null>(null);
  const maxTries = 3;

  const choiceInteractionRef = useRef<ChoiceInteraction | null>(null);
  const checkButtonRef = useRef<ActionButton | null>(null);

  useEffect(() => {
    const loadPreview = async () => {
      const saved = sessionStorage.getItem("questionData");
      if (!saved || !canvasRef.current) return;

      try {
        if (previewCanvas) {
          previewCanvas.dispose();
          previewCanvas = null;
        }

        const canvasElement = canvasRef.current;
        canvasElement.width = 800;
        canvasElement.height = 550;

        /** 새 캔버스 생성 */
        const canvas = new Canvas(canvasElement, {
          backgroundColor: "white",
          selection: false,
        });

        previewCanvas = canvas;
        const parsed = JSON.parse(saved);
        await canvas.loadFromJSON(parsed.elements);
        disableInteractions(canvas);

        const wrongDisplay = createWrongCountDisplay(
          0,
          maxTries,
          canvas.getWidth()
        );
        canvas.add(wrongDisplay);
        wrongDisplayRef.current = wrongDisplay;

        /** 선택지 인터랙션 */
        if (
          parsed.interaction?.interactionType === "choice" &&
          Array.isArray(parsed.interaction.choices)
        ) {
          const groupChoices = parsed.interaction.choices;
          const mode = parsed.interaction.mode;

          const interaction = new ChoiceInteraction(
            canvas,
            groupChoices,
            mode,
            (selectedSet) => {
              /** 선택지 선택 시 채점하기 버튼 활성화 */
              checkButtonRef.current?.setDisabled(selectedSet.size === 0);
            }
          );

          choiceInteractionRef.current = interaction;
        }

        /** ActionButton 위치 계산 */
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const buttonWidth = 150;
        const buttonHeight = 50;
        const buttonGap = 20;
        const marginBottom = 35;
        const totalWidth = buttonWidth * 2 + buttonGap;
        const startX = (canvasWidth - totalWidth) / 2;
        const y = canvasHeight - buttonHeight - marginBottom;

        /** 채점하기 버튼 생성 */
        const checkButton = new ActionButton(startX, y, "check", () => {
          const interaction = choiceInteractionRef.current;
          if (!interaction) return;

          const selected = interaction.getSelectedAnswers();
          const choices = parsed.interaction.choices;
          const currentWrongCount = wrongCountRef.current;

          const gotCorrect = selected.some((id) =>
            choices.find((c: Choice) => c.objectId === id && c.isAnswer)
          );

          checkAnswers(
            canvas,
            choices,
            selected,
            () => {
              wrongCountRef.current += 1;

              if (wrongDisplayRef.current) {
                wrongDisplayRef.current.set(
                  "text",
                  `틀린 횟수: ${wrongCountRef.current} / ${maxTries}`
                );
                canvas.requestRenderAll();
              }
            },
            gotCorrect || currentWrongCount + 1 === maxTries
          );

          /** 정답 맞췄거나 마지막 시도했으면 버튼 비활성화 */
          if (gotCorrect || wrongCountRef.current >= maxTries) {
            checkButton.setDisabled(true);
          } else {
            checkButton.setDisabled(true);
          }
        });

        checkButton.setDisabled(true);
        checkButtonRef.current = checkButton;

        /** 다음 문제 버튼 */
        const nextButton = new ActionButton(
          startX + buttonWidth + buttonGap,
          y,
          "next",
          () => {
            alert("다음 문제");
          }
        );

        canvas.add(checkButton);
        canvas.add(nextButton);
        canvas.renderAll();
      } catch (err) {
        console.error("Preview 로딩 실패:", err);
      }
    };

    requestAnimationFrame(() => {
      loadPreview();
    });

    return () => {
      if (previewCanvas) {
        previewCanvas.dispose();
        previewCanvas = null;
      }
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
