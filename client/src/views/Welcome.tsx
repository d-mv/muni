import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import layout from "../styles/_layout.module.scss";

const Welcome = (props: any) => {
  return (
    <main className={layout.mainTop}>
      <p>{props.language.text["welcome.enter"]}</p>
    </main>
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
)(Welcome);
