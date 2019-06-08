import React from "react";

import style from "../styles/Button.module.scss";

const Button = (props: {
  children?: any;
  action?: () => void;
  mode: string;
  submit?: boolean;
  disabled?: boolean;
  label?: string;
  title?: string;
}) => {
  let undefined;
  const buttonStyle = style[props.mode] || style.trans;

  const handleClick = () => {
    if (props.action) props.action();
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
