import { Group, Rect, Textbox } from "fabric";

type ButtonType = "check";

/** Preview에서 표시되는 Action Button (채점하기/다음 문제) */
export class ActionButton extends Group {
  button: Rect;
  buttonText: Textbox;
  disabled: boolean = false;
  public buttonType: ButtonType;

  constructor(x: number, y: number, type: ButtonType, onClick: () => void) {
    const buttonStyles = ActionButton.getButtonStyles(type);

    const button = new Rect({
      left: x,
      top: y,
      width: 150,
      height: 50,
      fill: buttonStyles.fill,
      rx: 10,
      ry: 10,
    });

    const buttonText = new Textbox(buttonStyles.text, {
      left: x + 75,
      top: y + 25,
      width: 150,
      fontSize: 18,
      fill: "white",
      originX: "center",
      originY: "center",
      textAlign: "center",
    });

    super([button, buttonText], {
      left: x,
      top: y,
      originX: "left",
      originY: "top",
      selectable: false,
      hoverCursor: "pointer",
    });

    this.button = button;
    this.buttonText = buttonText;
    this.buttonType = type;

    this.on("mousedown", () => {
      if (!this.disabled) onClick();
    });
  }

  /** 버튼 타입에 따라 텍스트 및 색상 반환 */
  private static getButtonStyles(type: ButtonType) {
    const styles = {
      check: { text: "채점하기", fill: "#33E651" },
    };
    return styles[type];
  }

  /** 버튼 활성화/비활성화 및 색상 변경 */
  public setDisabled(disabled: boolean) {
    this.disabled = disabled;
    const fillColor = disabled
      ? "#DAD6D6"
      : ActionButton.getButtonStyles(this.buttonType).fill;
    this.button.set("fill", fillColor);
    this.canvas?.requestRenderAll();
  }
}
