import React from "react";

import style from "./style/Modal.module.scss";

const Modal = (props: { children: JSX.Element; close: () => void }) => {
  return (
    <div className={style.modal} onClick={() => props.close()}>
      <div className={style.content}>{props.children}</div>
    </div>
  );
};
export default Modal;
