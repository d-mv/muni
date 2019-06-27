import { indexedObj } from "../store/types";

import { AppState } from "../store";
import styleFactory from "../modules/style_factory";
import Button from "./Button";
import { iconHelp } from "../icons/";
import React from "react";
import Title from "./Title";
import { connect } from "react-redux";
import styles from "./style/Header.module.scss";
import Help from "../features/Help";

const Header = (props: {
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
  type: any;
}) => {
  const [showHelp, setShowHelp] = React.useState(false);
  const { direction } = props.language;
  const { name } = props;

  const makeIcon = (icon: any, noRtl?: boolean) => {
    const style = noRtl
      ? styles["icon"]
      : styles[styleFactory("icon", direction)];
    return <div className={style}>{icon}</div>;
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const handleLeftAction = () => {
    props.left ? props.left.action() : toggleHelp();
  };
  const handleRightAction = () => {
    if (props.right) props.right.action();
  };

  const left = props.left
    ? makeIcon(props.left.icon, props.left.noRtl)
    : makeIcon(iconHelp(props.type === "muni" ? "secondary" : "primary"), true);

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
      <Title title={name} direction={direction} />
      <Button mode='minimal' action={handleRightAction}>
        {right}
      </Button>
      {showHelp ? <Help showHelp={toggleHelp} /> : null}
    </header>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    type: state.type
  };
};

export default connect(
  mapStateToProps,
  {}
)(Header);
