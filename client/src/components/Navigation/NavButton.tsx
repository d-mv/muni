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
  const testId = `${props.mode}-button`;
  const buttonStyle =
    props.mode === "nav" ? style.navButton : style.welcomeButton;
  return (
    <button
      data-testid={testId}
      className={buttonStyle}
      onClick={() => props.action(props.mode)}>
      {props.children}
    </button>
  );
};

export default NavButton;
