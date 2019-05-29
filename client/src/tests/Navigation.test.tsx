import React from "react";
import { render, cleanup } from "react-testing-library";
import { Provider } from "react-redux";
import configureStore from "../store";
const store = configureStore();
import renderComponent from "./_renderComponent";
import Navigation from "../components/Navigation/Navigation";

/**
 * Setup function to be sent as props
 * @function mockFn
 * @param {string} message - To receive button name as message
 * @return {}
 */
const mockFn = (message: string) => {};

afterEach(cleanup);

describe("Navigation", () => {
  it('should render "enter" button, when in "welcome" mode', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Navigation mode='welcome' />
      </Provider>
    );
    getByTestId("enter-button");
  });
  // it('should render four link elements if in mode "nav"', async () => {
  //   const { findAllByTestId } = render(
  //     <Provider store={store}>
  //       <Navigation />
  //     </Provider>
  //   );
  //   const navButtons = await findAllByTestId("nav-button").then(
  //     (data: any) => data
  //   );
  //   expect(navButtons.length).toBe(4);
  // });
});
