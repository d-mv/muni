import React from "react";

import Step from "./Step";

import style from "./style/Steps.module.scss";
import styleFactory from "../../../modules/style_factory";

/**
 * Function to create React.FunctionalComponent with set of step icons, clickable
 * @param {Object} props
 * @returns {React.FC}
 */
const Steps = (props: {
  current: number;
  direction: string;
  action: (arg0: number) => void;
  muni?: boolean
}) => {
  const stepsStyle = style[styleFactory("line", props.direction)];
  const stepsArray = props.muni ? [1, 2, 3] : [1,2,3,4,5]
  return (
    <section className={stepsStyle}>
      {stepsArray.map((step: number) => {
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
