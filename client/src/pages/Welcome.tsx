import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import Logo from "../components/Logo";
import { VectorLogo, VectorTitle, VectorSubTitle } from "../icons/Welcome";
import Page from "../layout/Page";
import Center from "../layout/Center";

import style from "./style/Welcome.module.scss";

const Welcome = (props: any) => {
  return (
    <Page welcome>
      <div className={style.pageContent}>
        <div className='app-logo'>
          <VectorLogo />
        </div>
        <div className='app-title'>
          <VectorTitle />
        </div>
        <div  className={style.divider}/>
        <div className='app-subTitle'>
          <VectorSubTitle />
        </div>
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
