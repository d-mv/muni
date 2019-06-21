import { indexedObj} from "../store/types";

import { AppState } from "../store";
import styleFactory from "../modules/style_factory";
import Button from "./Button";
import Help from "../icons/Help";
import React from "react";
import Title from "./Title";
import { connect } from "react-redux";
import styles from "./style/Header.module.scss";

const Header = (props: {
  language: indexedObj;
  name: string;
  right?: {
    icon: JSX.Element;
    action: () => void;
  };
  left?: {
    icon: JSX.Element;
    action: () => void;
  };
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

  const handleLeftAction = () => {
    props.left ? props.left.action() : setShowHelp(!showHelp);
  };
  const handleRightAction = () => {
    if (props.right) props.right.action();
  };

  const left = props.left
    ? makeIcon(props.left.icon)
    : makeIcon(<Help color='primary' />, true);

  const right = props.right ? makeIcon(props.right.icon) : <div />;

  return (
    <header className={styles[styleFactory("plank", direction)]}>
      <Button mode='minimal' action={handleLeftAction}>
        {left}
      </Button>
      <Title title={name} direction={direction} />
      <Button mode='minimal' action={handleRightAction}>
        {right}
      </Button>
    </header>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(Header);
