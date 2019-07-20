import { indexedObj } from "../store/types";

import { AppState } from "../store";
import styleFactory from "../modules/style_factory";
import Button from "./Button";
import { iconHelp } from "../icons/";
import React, { useEffect } from "react";
import Title from "../styles/Title";
import { connect } from "react-redux";
import styles from "./style/Header.module.scss";
import Help from "../features/Help";
import { showHelp } from "../store/users/actions";

const Header = (props: {
  help: boolean;
  language: indexedObj;
  name: string;
  right?: {
    icon: JSX.Element;
    action: () => void;
    noRtl?: boolean;
  };
  left?: {
    icon: JSX.Element;
    action: () => void;
    noRtl?: boolean;
  };
  user: any;
  module: string;
  showHelp: (arg0: boolean) => void;
}) => {
  const { direction } = props.language;
  const { name, user, module } = props;

  const makeIcon = (icon: any, noRtl?: boolean) => {
    const style = noRtl
      ? styles["icon"]
      : styles[styleFactory("icon", direction)];
    return <div className={style}>{icon}</div>;
  };

  useEffect(() => {
    if (user.settings.help) {
      props.showHelp(true);
    }
  }, []);

  const toggleHelp = () => {
    props.showHelp(!props.help);
  };

  const handleLeftAction = () => {
    if (props.left) {
      props.left.action();
    } else if (module === "home") {
      toggleHelp();
    }
  };
  const handleRightAction = () => {
    if (props.right) props.right.action();
  };

  const left = props.left ? (
    makeIcon(props.left.icon, props.left.noRtl)
  ) : module === "home" ? (
    makeIcon(
      iconHelp(props.user.type === "muni" ? "secondary" : "primary"),
      true
    )
  ) : (
    <div />
  );

  const right = props.right ? (
    makeIcon(props.right.icon, props.right.noRtl)
  ) : (
    <div />
  );

  return (
    <header className={styles[styleFactory("plank", direction)]}>
      <Button mode='minimal' action={handleLeftAction}>
        {left}
      </Button>
      <Title muni={props.user.type==='muni'}>{name}</Title>
      <Button mode='minimal' action={handleRightAction}>
        {right}
      </Button>
      {props.help ? <Help /> : null}
    </header>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    user: state.auth.user,
    help: state.help,
    module: state.module
  };
};

export default connect(
  mapStateToProps,
  { showHelp }
)(Header);
