import { indexedObj, indexedObjAny } from "../store/types";

import { AppState } from "../store";
import styleFactory from "../modules/style_factory";
import Button from "./Button";
import Edit from "../icons/Edit";
import Complain from "../icons/Complain";
import Help from "../icons/Help";
import React from "react";
import Title from "./Title";
import { connect } from "react-redux";
import { setModule } from "../store/users/actions";
import styles from "./styles/Header.module.scss";

const Header = (props: {
  language: indexedObj;
  location: indexedObjAny;
  setModule: (arg0: string) => void;
  name: indexedObj;
  module: string;
  prevModule: string;
}) => {
  const [showHelp, setShowHelp] = React.useState(false);
  // ! mock
  const returnTo = "home";
  const help = () => {};
  const action = (arg: any) => {};
  const edit = false;
  const complain = false;
  // ! end-of-mock

  const { direction } = props.language;

  const [currentModule, setCurrentModule] = React.useState(props.module);

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const goHome = () => {
    props.setModule(props.prevModule);
  }

  // defaults
  let leftButton = <Help color='primary' />;
  let leftAction = toggleHelp;
  let rightButton = "";
  let rightAction = goHome;
  let name = "";
  if (props.location && props.name) {
    name =
      props.location.name[props.language.short] || props.location.name["עב"];
  }

  switch (props.module) {
    case "post":
      leftButton = <div>back</div>;
      leftAction = goHome;
      break;
  }

  const title = <Title title={name} direction={direction} return={goHome} />;

  return (
    <header className={styles[styleFactory("plank", direction)]}>
      <Button mode='minimal' action={leftAction}>
        {leftButton}
      </Button>
      {title}
      <Button mode='minimal' action={rightAction}>
        {rightButton}
      </Button>
    </header>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    location: state.locationData,
    name: state.locationData.name,
    module: state.module,
    prevModule: state.prevModule
  };
};

export default connect(
  mapStateToProps,
  { setModule }
)(Header);
