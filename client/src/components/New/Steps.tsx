import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";

import styleFactory from '../../modules/style_factory'

import Step from "./Step";

import style from '../../styles/Steps.module.scss'

const Steps = (props: any) => {
  const {direction} = props.language
const stepsStyle = style[styleFactory("line",direction)]
  return (
    <section className={stepsStyle}>
      <Step step={1} />
      <Step step={2} />
      <Step step={3} />
      <Step step={4} />
      <Step step={5} />
    </section>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
  };
};

export default connect(
  mapStateToProps,
  { }
)(Steps);