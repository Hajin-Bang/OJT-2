import { Canvas, Group, Rect, Object as FabricObject } from "fabric";
import { Choice, UnitType } from "../../../types/choice";
import { selectChoiceBox, deselectChoiceBox } from "../../utils/choice";
import { isFeedbackIcon } from "../FeedbackIcon";

/** 선택지 상호작용 처리 */
export class ChoiceInteraction {
  private canvas: Canvas;
  private choices: Choice[];
  private mode: UnitType;
  private selectedIds: Set<string> = new Set();
  private onSelectChange?: (selected: Set<string>) => void;
  private isLocked = false;
  private resetAfterWrong = false;

  constructor(
    canvas: Canvas,
    choices: Choice[],
    mode: UnitType,
    onSelectChange?: (selected: Set<string>) => void
  ) {
    this.canvas = canvas;
    this.choices = choices;
    this.mode = mode;
    this.onSelectChange = onSelectChange;
    this.initSelection();
  }

  /** 선택지 클릭 이벤트 등록 */
  private initSelection() {
    const allIds = this.choices.map((c) => c.objectId);

    this.canvas.getObjects().forEach((obj) => {
      if (this.hasId(obj) && allIds.includes(obj.id)) {
        obj.selectable = true;
        obj.evented = true;
        obj.hoverCursor = "pointer";
        obj.hasBorders = false;
        obj.hasControls = false;
      } else {
        obj.selectable = false;
        obj.evented = false;
      }
    });

    /** 선택 이벤트 처리 */
    this.canvas.on("mouse:down", (e) => {
      if (this.isLocked) return;

      /** multi 모드일 때 이전 오답 - 상태 초기화 */
      if (this.resetAfterWrong && this.mode === "multi") {
        this.clearAllSelections();
        this.canvas.getObjects().forEach((obj) => {
          if (isFeedbackIcon(obj)) this.canvas.remove(obj);
        });
        this.resetAfterWrong = false;
      }

      const target = e.target;
      if (!target || !this.hasId(target)) return;
      const targetId = target.id;

      /** unit 모드일 땐 항상 선택 초기화 + 아이콘 제거 */
      if (this.mode === "unit") {
        this.clearAllSelections();
        this.canvas.getObjects().forEach((obj) => {
          if (isFeedbackIcon(obj)) this.canvas.remove(obj);
        });
      }

      /** 선택/해제 토글 */

      const wasSelected = this.selectedIds.has(targetId);
      const rect = this.findRectInGroup(target as Group);

      if (wasSelected) {
        this.selectedIds.delete(targetId);
        if (rect) deselectChoiceBox(rect);
      } else {
        this.selectedIds.add(targetId);
        if (rect) selectChoiceBox(rect);
      }

      this.canvas.requestRenderAll();
      this.onSelectChange?.(this.selectedIds);
    });
  }

  /** 모든 선택지 클릭 불가능하게 설정 */
  public disableInteraction() {
    const allIds = this.choices.map((c) => c.objectId);
    this.canvas.getObjects().forEach((obj) => {
      if (this.hasId(obj) && allIds.includes(obj.id)) {
        obj.selectable = false;
        obj.evented = false;
        obj.hoverCursor = "default";
      }
    });
    this.isLocked = true;
  }

  /** 다음 클릭 시 상태 초기화되도록 설정 */
  public setResetAfterWrong() {
    this.resetAfterWrong = true;
  }

  /** 선택 초기화 + 선택 효과 제거 */
  private clearAllSelections() {
    this.canvas.getObjects().forEach((obj) => {
      if (this.hasId(obj) && this.selectedIds.has(obj.id)) {
        const group = obj as Group;
        const rect = this.findRectInGroup(group);
        if (rect) deselectChoiceBox(rect);
      }
    });
    this.selectedIds.clear();
  }

  /** Group 내부 rect 요소 추출 */
  private findRectInGroup(group: Group): Rect | undefined {
    return group.getObjects().find((obj): obj is Rect => obj.type === "rect");
  }

  /** id 필드를 가진 오브젝트인지 확인 */
  private hasId(obj: FabricObject): obj is FabricObject & { id: string } {
    return "id" in obj && typeof obj.id === "string";
  }

  /** 선택된 objectId 목록 반환 */
  public getSelectedAnswers(): string[] {
    return Array.from(this.selectedIds);
  }
}
