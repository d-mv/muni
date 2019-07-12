import React from "react";

import style from "./style/Step.module.scss";

const Step = (props: {
  step: number;
  current: number;
  action: (arg0: number) => void;
}) => {
  const iconStyle = props.current < props.step + 1 ? style.step : style.filled;
  return (
    <div
      data-testid='step-icon'
      className={iconStyle}
      onClick={() => props.action(props.step)}>
      {props.step}
    </div>
  );
};

export default Step;
