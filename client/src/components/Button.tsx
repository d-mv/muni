import React from "react";

import style from "../styles/Button.module.scss";

const Button = (props: {
  children?: any;
  action?: () => void;
  form?: boolean;
  trans?: boolean;
  primary?: boolean;
  secondary?: boolean;
  attention?: boolean;
  submit?: boolean;
  disabled?: boolean;
  label?: string;
  title?: string;
}) => {
  let undefined;
  // default mode is 'transparent'
  let buttonStyle = style.minimal;
  if (props.trans) buttonStyle = style.trans;
  if (props.form) buttonStyle = style.form
  if (props.primary) buttonStyle = style.primary;
  if (props.secondary) buttonStyle = style.secondary;
  if (props.attention) buttonStyle = style.attention;

  const handleClick = () => {
    if (props.action) props.action();
  };

  return (
    <button
      className={buttonStyle}
      onClick={() => handleClick()}
      type={props.submit ? "submit" : undefined}
      disabled={props.disabled}
      aria-label={props.label}
      title={props.title}>
      {props.children}
    </button>
  );
};

export default Button;
