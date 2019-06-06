import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { indexedObj, indexedObjAny } from "../store/types";
import Button from "./Button";
import Help from "../icons/Help";
import Edit from "../icons/Edit";
import PageTitle from "./PageTitle";

import style from "../styles/Header.module.scss";

const Header = (props: {
  language: indexedObj;
  locationData: indexedObjAny;
}) => {
  const { text, direction } = props.language;

  const mockFN = () => {};
  const title: string = props.locationData.name[props.language.short]
    ? props.locationData.name[props.language.short]
    : props.locationData.name["en"];
  return (
    <header className={direction === "rtl" ? style.plankRight : style.plank}>
      <Button action={mockFN}>
        <Help color='primary' />
      </Button>
      <PageTitle title={title} direction={direction} />
      <Button action={mockFN}>
        <Edit color='primary' />
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
  {}
)(Header);
