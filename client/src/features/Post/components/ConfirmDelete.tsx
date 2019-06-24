import React from "react";
import Modal from "../../../components/Modal";

import styles from "./style/ConfirmDelete.module.scss";
import Button from "../../../components/Button";
import styleFactory from "../../../modules/style_factory";

export const ConfirmDelete = (props: {
  text: { message: string; buttonYes: string; buttonNo: string };
  close: () => void;
  action: (arg0: string) => void;
  direction: string;
}) => (
  <Modal close={props.close}>
    <div className={styles.container}>
      {props.text.message}
      <div className={styles[styleFactory("buttons", props.direction)]}>
        <Button
          mode='secondary'
          title={props.text.buttonYes}
          actionMessage={props.action}
        />
        <Button
          mode='attention'
          title={props.text.buttonNo}
          actionMessage={props.action}
        />
      </div>
    </div>
  </Modal>
);
