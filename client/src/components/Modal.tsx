import React from "react";

import style from "./style/Modal.module.scss";

const Modal = (props: {
  children: JSX.Element;
  close?: () => void;
  disabled?: boolean;
}) => {
  const handleClick = () => {
    if (!props.disabled && props.close) props.close();
  };
  return (
    <div className={style.modal} onClick={() => handleClick()}>
      <div className={style.content}>{props.children}</div>
    </div>
  );
};
export default Modal;
