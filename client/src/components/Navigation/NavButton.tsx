import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";

import * as ICON from "../../icons/NavIcons";
import style from "../../styles/Navigation.module.scss";

/**
 * Functional component to display a button
 * @function NavButton
 * @param {object} props - An object, containing options (such as mode:string) and a child to display
 * @returns {object} - React Element - JSX functional component
 */
const NavButton = (props: {
  mode: string;
  active?: boolean;
  icon?: string;
  module: string;
  children?: any;
  action: (arg0?: any) => void;
}) => {
  // set testid
  const testId = `${props.mode}-button`;

  /**
   * Function to create button element
   * @function buttonFactory
   * @param {string} style - Style of the element
   * @returns {object} - React component
   */
  const buttonFactory = (style: string, component?: any) => (
    <button
      data-testid={testId}
      className={style}
      onClick={() => props.action(props.mode)}>
      {props.mode === "nav" ? component : props.children}
    </button>
  );

  /** Function to create icon
   * @function iconFactory
   * @param {string} name
   * @param {boolean} active
   * @return {object} ReactElement
   */
  const iconFactory = () => {
    const iconName = `${props.icon}${
      props.module === props.icon ? "Active" : "Regular"
    }`;
    const icons: any = ICON;
    return icons[iconName];
  };

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
      const active = props.active ? props.active : false;
      component = buttonFactory(style.navButton, iconFactory());
      break;
    default:
      component = buttonFactory(style.welcomeButton);
  }
  return component;
};

const mapStateToProps = (state: AppState) => {
  return {
    module: state.module
  };
};

export default connect(
  mapStateToProps,
  {}
)(NavButton);
