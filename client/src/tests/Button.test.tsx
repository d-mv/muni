import React from "react";
import { render, cleanup } from "react-testing-library";

import Button from "../components/_Button";

/**
 * Setup function to be sent as props
 * @function mockFn
 * @param {string} message - To receive button name as message
 * @return {}
 */
const mockFn = () => {};

afterEach(cleanup);

describe("Button", () => {
  it("should render button with name", () => {
    const { getByText } = render(
      <Button mode='minimal' action={mockFn}>Hello</Button>
    );
    getByText("Welcome");
  });
});
