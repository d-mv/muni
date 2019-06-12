import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { setModule, setLoading } from "../../store/users/actions";

import NavButton from "./components/NavButton";
import EntranceButton from "./components/EntranceButton";

import { Spacer } from '../../layout/Utils'

import style from "./styles/Navigation.module.scss";
/**
 * Functional component to display a footer wrapper with buttons
 * @function Navigation
 * @param {object} props - Mode option to show either full size label-button or navigation buttons
 * @returns {object} - React Element - JSX functional component
 */
const Navigation = (props: any) => {
const { direction } = props.language

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
          <Spacer size={10} units='%'/>
        </nav>
      );
      break;
    case "new":
      component = (
        <nav className={style.header}>
          <NavButton mode='return-home' action={action} />
          <h1>Create New</h1>
          <Spacer size={10} units='%' />
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
        <nav
          className={
            direction === "rtl"
              ? style.footerRight
              : style.footerNav
          }>
          <NavButton mode='nav' icon='municipality' action={action} />
          <NavButton mode='nav' icon='home' action={action} />
          <NavButton mode='empty'/>
          <NavButton mode='nav' icon='mine' action={action} />
          <NavButton mode='nav' icon='profile' active={true} action={action} />
        </nav>
      );
  }
  return component;
};

const mapStateToProps = (state: AppState) => {
  return {
    module: state.module,
    language: state.language
  };
};

export default connect(
  mapStateToProps,
  { setModule, setLoading }
)(Navigation);
