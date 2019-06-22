import React from "react";
import { connect } from "react-redux";
import { AppState } from "../store";
import { setModule } from "../store/users/actions";
import Page from "../layout/Page";

import layout from "./style/Confirmation.module.scss";
import { data } from "../store/types";

const Confirmation = (props: {
  language: data;
  setModule: (arg0: string) => void;
}) => {
  const { text } = props.language;
  setTimeout(() => {
    props.setModule("login");
  }, 3000);
  return (
    <Page>
      <div className={layout.wrapper}>
        <p className={layout.centralMessage}>{text["confirmation.message"]}</p>
      </div>
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
  {
    setModule
  }
)(Confirmation);
