import { scrollCalculator } from "../modules/scroll_calc";

it("Shows right number when moving left", () => {
  const component = scrollCalculator("LEFT", 0, 10);
  expect(component).toBe(1);
});
it("Shows right number when moving right", () => {
  const component = scrollCalculator("RIGHT", 0, 10);
  expect(component).toBe(10);
});
