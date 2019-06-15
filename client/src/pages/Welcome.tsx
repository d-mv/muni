import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import Logo from "../components/Logo";

import Page from "../layout/Page";
import Center from "../layout/Center";

import style from "./style/Welcome.module.scss";

const Welcome = (props: any) => {
  return (
    <Page welcome>
      <Logo />
      <div className={style.text}>
        <Center>
          <span className='app-title'>Your Voice</span>
        </Center>
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
  {}
)(Welcome);
