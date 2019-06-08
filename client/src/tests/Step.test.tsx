import React from "react";
import { render, cleanup } from "react-testing-library";

import Step from "../components/New/Step";

afterEach(cleanup);

describe("Step icon", () => {
  it("should return icon with number supplied, unfilled if fill option not provided or wrong", () => {
    const { getByText } = render(<Step step={1} />);
    getByText("1");
    getByText("1").className = "step";
    // console.log(getByText("1").style.background);
  });
  it("should return icon with number supplied, filled", () => {
    const { getByText } = render(<Step step={2} />);
    getByText("2").className = "filled";
    // console.log(getByText("2").style.backgroundColor==='');
  });
});
