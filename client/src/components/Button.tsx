import React from "react";

import {
  PrimaryButton,
  SecondaryButton,
  AttentionButton,
  FormButton,
  MinimalButton,
  WhiteButton
} from "../styles/Button";

const Button = (props: {
  mode: string;
  children?: any;
  label?: string;
  submit?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onClickMessage?: (arg0: string) => void;
}) => {
  const {
    mode,
    submit,
    disabled,
    onClick,
    children,
    label,
    onClickMessage
  } = props;

  const type = submit ? "submit" : undefined;

  const handleClick = () => {
    if (onClick) onClick();
    if (onClickMessage) onClickMessage(props.mode);
  };

  let button = (
    <PrimaryButton
      type={type}
      onClick={() => handleClick()}
      disabled={disabled}
      aria-label={label ? label : children}>
      {children}
    </PrimaryButton>
  );
  switch (mode) {
    case "secondary":
      button = (
        <SecondaryButton
          type={type}
          onClick={() => handleClick()}
          disabled={disabled}
          aria-label={label ? label : children}>
          {children}
        </SecondaryButton>
      );
      break;
    case "attention":
      button = (
        <AttentionButton
          type={type}
          onClick={() => handleClick()}
          disabled={disabled}
          aria-label={label ? label : children}>
          {children}
        </AttentionButton>
      );
      break;
    case "form":
      button = (
        <FormButton type={type} onClick={() => handleClick()}>
          {children}
        </FormButton>
      );
      break;
    case "minimal":
      button = (
        <MinimalButton type={type} onClick={() => handleClick()}>
          {children}
        </MinimalButton>
      );
      break;
    case "white":
      button = (
        <WhiteButton onClick={() => handleClick()}>{children}</WhiteButton>
      );
  }

  return button;
};

export default Button;
