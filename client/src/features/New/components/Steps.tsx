import React from "react";

import styleFactory from "../../../modules/style_factory";

import Step from "./Step";

import style from "./styles/Steps.module.scss";

const Steps = (props: { current: number; direction: string }) => {
  const stepsStyle = style[styleFactory("line", props.direction)];
  return (
    <section className={stepsStyle}>
      <Step step={1} current={props.current} />
      <Step step={2} current={props.current} />
      <Step step={3} current={props.current} />
      <Step step={4} current={props.current} />
      <Step step={5} current={props.current} />
    </section>
  );
};

export default Steps;
