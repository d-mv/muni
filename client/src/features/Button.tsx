import React from "react";

import { PrimaryButton, SecondaryButton, FormButton } from "../styles/Button";

const Button = (props: {
  mode: string;
  children: any;
  label: string;
  submit?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const { mode, submit, disabled, onClick, children, label } = props;
  const type = submit ? "submit" : undefined;

  const handleClick = () => {
    if (onClick) onClick();
  };

  let button = (
    <PrimaryButton
      type={type}
      onClick={() => handleClick()}
      disabled={disabled}
      aria-label={label}>
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
          aria-label={label}>
          {children}
        </SecondaryButton>
      );
      break;
    case "form":
      button = (
        <FormButton type={type} onClick={() => handleClick()}>
          {children}
        </FormButton>
      );
      break;
  }

  return button;
};

export default Button;
