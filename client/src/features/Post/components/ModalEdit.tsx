import React from "react";

import Modal from "../../../components/Modal";
import Button from "../../../components/Button";

import style from "./style/ModalEdit.module.scss";

export const ModalEdit = (props: {
  close: () => void;
  text: { message: string; confirm: string; cancel: string };
  action: (arg0: string) => void;
  children?: any;
}) => (
  <Modal close={props.close}>
    <div className={style.container}>
      <p>{props.text.message}</p>
      {props.children}
      <div>
        <Button
          mode='primary'
          title={props.text.confirm}
          actionMessage={props.action}
        />
        <Button
          mode='attention'
          title={props.text.cancel}
          actionMessage={props.action}
        />
      </div>
    </div>
  </Modal>
);
