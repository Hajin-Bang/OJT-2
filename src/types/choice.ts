export interface Choice {
  id: string;
  imageUrl: string;
  objectId: string;
  isAnswer: boolean;
}

export type UnitType = "unit" | "multi";

export interface GroupBlock {
  id: number;
  unitType: UnitType;
  choices: Choice[];
}
