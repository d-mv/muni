import React from "react";

import style from "../../styles/Navigation.module.scss";

/**
 * Functional component to display a button
 * @function NavButton
 * @param {object} props - An object, containing options (such as mode:string) and a child to display
 * @returns {object} - React Element - JSX functional component
 */
const NavButton = (props: {
  mode: string;
  children: any;
  action: (arg0?: any) => void;
}) => {
  // set testid
  const testId = `${props.mode}-button`;

  /**
   * Function to create button element
   * @function button
   * @param {string} style - Style of the element
   * @returns {object} - React component
   */
  const button = (style: string) => (
    <button
      data-testid={testId}
      className={style}
      onClick={() => props.action(props.mode)}>
      {props.children}
    </button>
  );

  let component;
  // define style and/or component, based on mode
  switch (props.mode) {
    case "enter":
      component = (
        <div
          className={style.enter}
          data-testid={testId}
          onClick={() => props.action(props.mode)}>
          <span>ENTRANCE</span>
          <span>כניסה</span>
          <span>دخول</span>
        </div>
      );
      break;
    case "nav":
      component = button(style.navButton);
      break;
    default:
      component = button(style.welcomeButton);
  }
  return component;
};

export default NavButton;
