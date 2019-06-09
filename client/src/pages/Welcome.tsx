import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import Page from "../layout/Page";

const Welcome = (props: any) => {
  return (
    <Page welcome>
      <p>{props.language.text["welcome.enter"]}</p>
      <p>this is logo:</p>
    </Page>
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
