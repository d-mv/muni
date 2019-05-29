import React from "react";

import NavButton from "./NavButton";

/**
 * Functional component to display a footer wrapper with buttons
 * @function Navigation
 * @param {object} props - Mode option to show either full size label-button or navigation buttons
 * @returns {object} - React Element - JSX functional component
 */
const Navigation = (props: { mode: string }) => {
  // mock fn
  const action = () => {}
  // default -
  let component = (
    <footer>
      <NavButton mode='welcome' action={action}>
        welcome
      </NavButton>{" "}
    </footer>
  );
  //
  if (props.mode === "nav") {
    component = (
      <footer>
        <NavButton mode='nav' action={action}>
          {props.mode}
        </NavButton>
        <NavButton mode='nav' action={action}>
          {props.mode}
        </NavButton>
        <NavButton mode='nav' action={action}>
          {props.mode}
        </NavButton>
        <NavButton mode='nav' action={action}>
          {props.mode}
        </NavButton>
      </footer>
    );
  }
  return component;
};

export default Navigation;
