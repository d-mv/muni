import React from "react";

import Modal from "../../../components/Modal";

import styles from "./style/ModalView.module.scss";

export const ModalView = (props: { close: () => void; text: string }) => (
  <Modal close={props.close}>
    <div className={styles.text}>{props.text}</div>
  </Modal>
);
