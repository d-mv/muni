import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import { VectorLogo, VectorTitle, VectorSubTitle } from "../icons/Welcome";
import style from "./style/Welcome.module.scss";
import Login from "../features/Login";

const Welcome = (props: any) => (
  <div className={style.welcomeDesktop}>
    <div className={style.blockLeft}>
      <div className={style.logo}>
        <VectorLogo />
      </div>
      <div className={style.title}>
        <VectorTitle />
      </div>
      <div className={style.divider} />
      <div className={style.subTitle}>
        <VectorSubTitle />
      </div>
    </div>
    <div className={style.blockRight}>
      <Login desktop />
    </div>
  </div>
);

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(Welcome);
