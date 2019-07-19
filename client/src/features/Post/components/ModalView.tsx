import React from "react";

import Modal from "../../../components/Modal";

import styles from "./style/ModalView.module.scss";
import Center from "../../../layout/Center";

export const ModalView = (props: { close: () => void; text: string }) => (
  <Modal close={props.close}>
    <div className={styles.text}>{props.text}</div>
  </Modal>
);
