import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../../store";

import { goBack } from "../../../icons";
import style from "./styles/NavButton.module.scss";

/** Function to create icon
 * @function iconFactory
 * @param {string} name
 * @param {boolean} active
 * @return {object} ReactElement
 */
const iconFactory = (props: { icon: string; module: string }) => {
  const iconName = `${props.icon}${
    props.module === props.icon ? "Active" : "Regular"
  }`;
  const ICON = require("./NavIcons");
  const icons: any = ICON;
  return icons[iconName];
};

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
  action?: (arg0?: any) => void;
}) => {
  const { mode } = props;
  const testId = `${mode}__button`;

  const actionHandler = (action?: any) => {
    if (props.action) props.action(action);
  };

  /**
   * Function to create button element
   * @function buttonFactory
   * @param {string} style - Style of the element
   * @returns {object} - React component
   */
  const buttonFactory = (style: string, children: any, action: string) => (
    <button
      data-testid={testId}
      className={style}
      onClick={() => actionHandler(action)}>
      {children}
    </button>
  );

  let component;
  // build component
  switch (mode) {
    case "empty":
      component = <button data-testid={testId} className={style.navButtonEmpty} />;
      break;
    case "nav":
      const icon = props.icon || "";
      component = buttonFactory(
        style.navButton,
        iconFactory({ icon, module: props.module }),
        icon
      );
      break;
    default:
      const modeDetails = mode.split("-");
      if (modeDetails[0] === "return") {
        component = buttonFactory(style.return, goBack, modeDetails[1]);
      } else {
        component = null;
      }
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
