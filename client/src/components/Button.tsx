import React from "react";

import style from "../styles/Button.module.scss";

const Button = (props: {
  name: string;
  mode: string;
  action: (arg0: string) => void;
}) => {
  // primary
  // secondary
  // vote
  // new petition with link
  let mode;
  switch (props.mode) {
    case "secondary":
      mode = style.buttonSecondary;
      break;
    default:
      mode = style.buttonPrimary;
  }
  return (
    <button className={mode} onClick={() => props.action(props.name)}>
      {props.name}
    </button>
  );
};

export default Button;
