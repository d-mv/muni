import React from "react";
import Modal from "../../../components/Modal";

import styles from "./style/Confirm.module.scss";
import Button from "../../../components/Button";
import InLine from "../../../styles/utils/InLine";

export const Confirm = (props: {
  text: { message: string; buttonYes: string; buttonNo: string };
  close: () => void;
  action: (arg0: string) => void;
  direction: string;
}) => (
    <Modal close={props.close}>
      <div className={styles.container}>
        {props.text.message}
        <InLine direction={props.direction} justify='space-around' padding='2rem 0 .5rem 0'>
          <Button mode='primary' onClickMessage={props.action}>
            {props.text.buttonYes}
          </Button>
          <Button mode='attention' onClickMessage={props.action}>
            {props.text.buttonNo}
          </Button>
        </InLine>
      </div>
    </Modal>
  );

