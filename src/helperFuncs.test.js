import { isGameDone } from "./helperFuncs.js";
import { BLACK, WHITE } from "./constants.js";

const testPieces1 = [{ color: BLACK }, { color: WHITE }];
const testPieces2 = [{ color: BLACK }, { color: BLACK }];

it("returns game not done when there's at least one black and white piece", () => {
  expect(isGameDone(testPieces1)).toBe(false);
});

it("returns game done when there's only one color of pieces", () => {
  expect(isGameDone(testPieces2)).toBe(true);
});
