import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { setModule,setLoading } from "../../store/users/actions";

import NavButton from "./NavButton";

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
        props.setModule("login");
        break;
      case "login":
        props.setModule("welcome");
        break;
      case 'confirmation':
        props.setModule("confirmation");
        break;
      default:
        props.setModule(module);
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
            ENTER
          </NavButton>
        </nav>
      );
      break;
    case "login":
      component = (
        <nav className={style.header}>
          <NavButton mode='login' action={action}>
            RETURN
          </NavButton>
        </nav>
      );
      break;
    case 'confirmation':
      component = (
        <nav className={style.header}>
          <NavButton mode='confirmation' action={action}>
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
  { setModule,setLoading }
)(Navigation);
