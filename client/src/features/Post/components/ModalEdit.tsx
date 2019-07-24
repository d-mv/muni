import React from "react";

import { Modal, ModalContent } from "../../../styles/Modal";
import Button from "../../Button";

import InLine from "../../../styles/utils/InLine";
import InColumn from "../../../styles/utils/InColumn";
import Message from "../../../styles/Message";

export const ModalEdit = (props: {
  direction: string;
  close: () => void;
  text: { message: string; confirm: string; cancel: string };
  action: (arg0: string) => void;
  children?: any;
}) => (
  <Modal>
    <ModalContent>
      <InColumn justify='center' direction={props.direction}>
        <Message>{props.text.message}</Message>
        {props.children}
        <InLine
          direction={props.direction}
          justify='space-between'
          padding='2rem 0 2rem 0'
          width='75%'>
          <Button mode='primary' onClickMessage={props.action}>
            {props.text.confirm}
          </Button>
          <Button mode='attention' onClickMessage={props.action}>
            {props.text.cancel}
          </Button>
        </InLine>
      </InColumn>
    </ModalContent>
  </Modal>
);
