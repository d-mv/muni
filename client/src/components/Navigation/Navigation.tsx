import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { setModule, setLoading } from "../../store/users/actions";

import NavButton from "./NavButton";
import EntranceButton from "./EntranceButton";

import style from "../../styles/Navigation.module.scss";
import utils from "../../styles/_utils.module.scss";
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
      case "confirmation":
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
          <EntranceButton action={action} />
        </nav>
      );
      break;
    case "login":
      component = (
        <nav className={style.header}>
          <NavButton mode='return-welcome' action={action} />
          <h1>"App Name"</h1>
          <span className={utils.spacer10pct} />
        </nav>
      );
      break;
    case "confirmation":
      component = (
        <nav className={style.header}>
          <NavButton mode='confirmation' action={action}>
            RETURN
          </NavButton>
        </nav>
      );
      break;
    default:
      component = (
        <nav className={style.footerNav}>
          <NavButton mode='nav' icon='municipality' action={action} />
          <NavButton mode='nav' icon='home' action={action} />
          <NavButton mode='nav' icon='new' action={action} />
          <NavButton mode='nav' icon='profile' active={true} action={action} />
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
  { setModule, setLoading }
)(Navigation);
