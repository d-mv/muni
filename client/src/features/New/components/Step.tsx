import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../../store";

import style from "./styles/Step.module.scss";

const Step = (props: { step: number; currentStep: number }) => {
  const iconStyle = props.currentStep < props.step ? style.step : style.filled;
  return (
    <div data-testid='step-icon' className={iconStyle}>
      {props.step}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    currentStep: state.step
  };
};

export default connect(
  mapStateToProps,
  {}
)(Step);
