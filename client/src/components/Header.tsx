import React, { useEffect } from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { showHelp } from "../store/users/actions";

import Help from "../features/Help";

import Button from "./Button";
import Title from "../styles/Title";
import Icon from "../styles/header/Icon";
import PageHeader from "../styles/Header";

import { iconHelp } from "../icons/";

const Header = (props: {
  help: boolean;
  direction: string;
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
  const { name, user, module } = props;

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
    <Icon rtl={props.left.noRtl ? props.left.noRtl : false}>
      {props.left.icon}
    </Icon>
  ) : module === "home" ? (
    <Icon rtl={true}>
      {iconHelp(props.user.type === "muni" ? "secondary" : "primary")}
    </Icon>
  ) : null;

  return (
    <PageHeader direction={props.direction}>
      <Button mode='minimal' onClick={handleLeftAction}>
        {left}
      </Button>
      <Title muni={props.user.type === "muni"}>{name}</Title>
      <Button mode='minimal' onClick={handleRightAction}>
        {props.right ? (
          <Icon rtl={props.right.noRtl ? props.right.noRtl : false}>
            {props.right.icon}
          </Icon>
        ) : null}
      </Button>
      {props.help ? <Help /> : null}
    </PageHeader>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    direction: state.language.direction,
    user: state.auth.user,
    help: state.help,
    module: state.module
  };
};

export default connect(
  mapStateToProps,
  { showHelp }
)(Header);
