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
  locationData: indexedObjAny;
  returnTo: string;
  help: () => void;
  action?: (arg?: any) => void;
  setModule: (arg0: string) => void;
  edit?: boolean;
  complain?: boolean;
}) => {
  const { direction } = props.language;

  const handleSecondaryClick = () => {
    if (props.action) {
      props.action();
    }
  };

  const title: string = props.locationData.name[props.language.short]
    ? props.locationData.name[props.language.short]
    : props.locationData.name["en"];

  const handleReturn = () => {
    props.setModule(props.returnTo);
  };

  let secondButton: React.ClassicElement<any> = <div />;
  if (props.edit) {
    secondButton = <Edit color='primary' />;
  } else if (props.complain) {
    secondButton = <Complain />;
  }
  return (
    <header className={styles[styleFactory("plank", direction)]}>
      <Button mode='minimal' action={props.help}>
        <Help color='primary' />
      </Button>
      <Title title={title} direction={direction} return={handleReturn} />
      <Button mode='minimal' action={() => handleSecondaryClick()}>
        {secondButton}
      </Button>
    </header>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    locationData: state.locationData
  };
};

export default connect(
  mapStateToProps,
  { setModule }
)(Header);
