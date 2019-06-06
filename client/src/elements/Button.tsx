import React from "react";

import style from "../styles/_elements.module.scss";

const Button = (props: { title: string; action: (arg0?: any) => void }) => {
  const handleClick = () => {
    props.action();
  };
  return (
    <button className={style.buttonPrimary} onClick={() => handleClick()}>
      {props.title}
    </button>
  );
};

export default Button;
