import React from "react";
import { render, cleanup } from "react-testing-library";

import Step from "../features/New/components/Step";

afterEach(cleanup);

const mockFn = (x:number) => {}

describe("Step icon", () => {
  it("should return icon with number supplied, unfilled if fill option not provided or wrong", () => {
    const { getByText } = render(<Step step={1} current={0} action={mockFn}/>);
    getByText("1");
    getByText("1").className = "step";
  });
  it("should return icon with number supplied, filled", () => {
    const { getByText } = render(<Step step={2} current={3} action={mockFn} />);
    getByText("2").className = "filled";
  });
});
