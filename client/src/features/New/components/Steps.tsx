import React from "react";

import Step from "./Step";

import styleFactory from "../../../modules/style_factory";
import style from "./styles/Steps.module.scss";

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
        return (
          <Step
            key={step}
            step={step}
            current={props.current}
            action={props.action}
          />
        );
      })}
    </section>
  );
};

export default Steps;
