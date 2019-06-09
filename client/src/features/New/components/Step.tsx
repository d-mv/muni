import React from "react";

import style from "./styles/Step.module.scss";

const Step = (props: { step: number; current: number }) => {
  const iconStyle = props.current < props.step ? style.step : style.filled;
  return (
    <div data-testid='step-icon' className={iconStyle}>
      {props.step}
    </div>
  );
};

export default Step;
