import React from "react";

import Step from "./Step";

import styleFactory from "../../../modules/style_factory";
import style from "./styles/Steps.module.scss";

/**
 * Function to create step icons
 *
 * @param {number} step
 * @param {number} current
 * @param {function} action
 *
 * @returns {React.FC}
 */
const stepFactory = (
  step: number,
  current: number,
  action: (arg0: any) => void
) => {
  return <Step step={step} current={current} action={action} />;
};

/**
 * Function to create React.FunctionalComponent with set of step icons, clickable
 *
 * @param {Object} props
 *
 * @returns {React.FC}
 */
const Steps = (props: {
  current: number;
  direction: string;
  action: (arg0: number) => void;
}) => {
  const stepsStyle = style[styleFactory("line", props.direction)];
  return (
    <section className={stepsStyle}>
      {[1, 2, 3, 4, 5].map((step: number) => {
        return stepFactory(step, props.current, props.action);
      })}
    </section>
  );
};

export default Steps;
