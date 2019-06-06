import React from "react";

import style from "../styles/Button.module.scss";

const Button = (props: { children: any; action: () => void }) => {
  return (
    <button className={style.button} onClick={() => props.action()}>
      {props.children}
    </button>
  );
};

export default Button;
