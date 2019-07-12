import React from "react";

import style from "./style/Button.module.scss";

const Button = (props: {
  children?: any;
  action?: () => void;
  mode: string;
  submit?: boolean;
  disabled?: boolean;
  label?: string;
  title?: string;
  actionMessage?: (arg0: string) => void;
}) => {
  let undefined;
  let buttonStyle = style[props.mode] || style.trans;

  const handleClick = () => {
    if (props.action) props.action();
    if (props.actionMessage) props.actionMessage(props.mode);
  };

  return (
    <button
      className={buttonStyle}
      onClick={() => handleClick()}
      type={props.submit ? "submit" : undefined}
      disabled={props.disabled}
      aria-label={props.label}>
      {props.children || props.title}
    </button>
  );
};

export default Button;
