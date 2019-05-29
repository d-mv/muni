import React from "react";
import { render, cleanup } from "react-testing-library";

import Button from "../components/Button";

/**
 * Setup function to be sent as props
 * @function mockFn
 * @param {string} message - To receive button name as message
 * @return {}
 */
const mockFn = (message: string) => {};

afterEach(cleanup);

describe("Button", () => {
  it("should render button with name", () => {
    const { getByText } = render(
      <Button mode='primary' name='Welcome' action={mockFn} />
    );
    getByText("Welcome");
  });
});
