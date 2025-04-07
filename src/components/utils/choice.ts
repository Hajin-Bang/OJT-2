import { Rect } from "fabric";

export const selectChoiceBox = (rect: Rect) => {
  rect.set("stroke", "#33E651");
  rect.set("strokeWidth", 3);
};

export const deselectChoiceBox = (rect: Rect) => {
  rect.set("stroke", "#D1D1D1");
  rect.set("strokeWidth", 2);
};
