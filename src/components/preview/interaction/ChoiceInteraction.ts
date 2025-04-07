import { Canvas, Group, Rect, Object as FabricObject } from "fabric";
import { Choice, UnitType } from "../../../types/choice";
import { selectChoiceBox, deselectChoiceBox } from "../../utils/choice";

/** 선택지 상호작용 처리 */
export class ChoiceInteraction {
  private canvas: Canvas;
  private choices: Choice[];
  private mode: UnitType;
  private selectedIds: Set<string> = new Set();
  private onSelectChange?: (selected: Set<string>) => void;

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

  /** 선택지에 마우스 이벤트 등록 */
  private initSelection() {
    const allIds = this.choices.map((c) => c.objectId);

    this.canvas.getObjects().forEach((obj) => {
      if (this.hasId(obj) && allIds.includes(obj.id)) {
        obj.selectable = true;
        obj.evented = true;
        obj.hoverCursor = "pointer";

        /** 선택 외곽선 안 보이게 설정 */
        obj.hasBorders = false;
        obj.hasControls = false;
      } else {
        obj.selectable = false;
        obj.evented = false;
      }
    });

    this.canvas.on("mouse:down", (e) => {
      const target = e.target;
      if (!target || !this.hasId(target)) return;
      const targetId = target.id;

      if (this.mode === "unit") {
        this.clearAllSelections();
      }

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

  /** 그룹 내부에서 rect 객체 찾기 */
  private findRectInGroup(group: Group): Rect | undefined {
    return group.getObjects().find((obj): obj is Rect => obj.type === "rect");
  }

  /** id 필드를 가진 객체인지 검사 */
  private hasId(obj: FabricObject): obj is FabricObject & { id: string } {
    return "id" in obj && typeof obj.id === "string";
  }

  /** 선택된 objectId 목록 반환 */
  public getSelectedAnswers(): string[] {
    return Array.from(this.selectedIds);
  }
}
