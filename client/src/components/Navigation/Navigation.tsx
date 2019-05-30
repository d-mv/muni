import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { setModuleU,setLoading } from "../../store/users/actions";

import NavButton from "./NavButton";

import layout from "../../styles/_layout.module.scss";
import style from "../../styles/Navigation.module.scss";
/**
 * Functional component to display a footer wrapper with buttons
 * @function Navigation
 * @param {object} props - Mode option to show either full size label-button or navigation buttons
 * @returns {object} - React Element - JSX functional component
 */
const Navigation = (props: any) => {
  // toggle module to show
  const action = (module: string) => {
    switch (module) {
      case "enter":
        props.setModuleU("login");
        break;
      case "login":
        props.setModuleU("welcome");
        props.setLoading(false)
        break;
      default:
        props.setModuleU(module);
    }
  };
  // set the variable
  let component;
  // choose what to show
  switch (props.module) {
    case "welcome":
      component = (
        <nav className={style.footer}>
          <NavButton mode='enter' action={action}>
            enter
          </NavButton>
        </nav>
      );
      break;
    case "login":
      component = (
        <nav className={style.header}>
          <NavButton mode='login' action={action}>
            return
          </NavButton>
        </nav>
      );
      break;
    default:
      component = (
        <nav className={style.footer}>
          <NavButton mode='nav' action={action}>
            municipality
          </NavButton>
          <NavButton mode='nav' action={action}>
            home
          </NavButton>
          <NavButton mode='nav' action={action}>
            create
          </NavButton>
          <NavButton mode='nav' action={action}>
            profile
          </NavButton>
        </nav>
      );
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
  { setModuleU,setLoading }
)(Navigation);
