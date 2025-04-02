/**
 * 요소를 저장하는 handler
 * 캔버스의 요소들을 sessionStorage에 저장
 *  */
export const handleSave = () => {
  const canvas = window.canvas;
  if (!canvas) return;

  /** 캔버스의 모든 객체와 상태를 JSON으로 변환 */
  const canvasJSON = canvas.toJSON();

  const data = {
    elements: canvasJSON,
    interaction: {
      interactionType: "choice",
      choices: [
        {
          mode: "unit",
          options: [],
          answer: [],
        },
      ],
      sounds: {},
    },
  };

  /** sessionStorage에 데이터 저장 */
  sessionStorage.setItem("questionData", JSON.stringify(data));
  alert("저장 완료");
};
