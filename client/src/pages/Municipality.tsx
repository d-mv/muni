import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { data } from "../store/types";
import { showHelp } from "../store/app/actions";

import MuniPage from "../features/Municipality";
import Help from "../features/Help";
import Header from "../components/Header";

import Page from "../layout/Page";

const Municipality = (props: {
  language: data;
  help: boolean;
  showHelp: (arg0: boolean) => void;
}) => {
  const toggleHelp = () => {
    props.showHelp(!props.help);
  };

  const header = <Header help={toggleHelp} returnTo='municipality' />;
  const help = props.help ? (
    <Help
      mode='municipality'
      direction={props.language.direction}
      cancel={toggleHelp}
    />
  ) : null;

  return (
    <Page>
      {header}
      {help}
      <MuniPage />
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    help: state.help
  };
};

export default connect(
  mapStateToProps,
  { showHelp }
)(Municipality);
