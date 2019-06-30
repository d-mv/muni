import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import style from "./style/Loading.module.scss";
import { VectorLogo } from "../icons/Welcome";

const Loading = (props: { type: any; message?: string }) => (
  <div className={props.type === "muni" ? style.wrapperMuni : style.wrapper}>
    <div className={style.logo}>
      <VectorLogo />
    </div>
    <div className={style.loader}>
      <div className={style.outer} />
      <div className={style.middle} />
      <div className={style.inner} />
    </div>
    <div className={style.message}>{props.message}</div>
  </div>
);

const mapStateToProps = (state: AppState) => {
  return {
    type: state.type
  };
};

export default connect(
  mapStateToProps,
  {}
)(Loading);
