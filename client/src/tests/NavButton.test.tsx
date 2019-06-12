import React from "react";
import { render, cleanup } from "react-testing-library";

import NavButton from "../features/Navigation/components/NavButton";

/**
 * Setup function to be sent as props
 * @function mockFn
 * @param {string} message - To receive button name as message
 * @return {}
 */
const mockFn = (message: string) => {};

afterEach(cleanup);

describe("Navigation", () => {
  const child = (
    <img
      src='https://www.google.co.il/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'
      alt='test-image'
    />
  );

  it("should render children", () => {
    const { getByText } = render(
      <NavButton mode='nav' action={mockFn}>
        {child}
      </NavButton>
    );
    // get the alt-text of the image
  });
  it("should act on click", async () => {
    const { findAllByTestId } = render(
      <NavButton mode='nav' action={mockFn}>
        {child}
      </NavButton>
    );
    // should handle click props
  });
});
