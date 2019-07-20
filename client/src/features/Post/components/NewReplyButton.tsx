import React from "react";

import styles from "./style/NewReplyButton.module.scss";
import Button from "../../Button";
import Center from "../../../styles/Center";

export const NewReplyButton = (props: { action: () => void; text: string }) => (
  <Center>
    <Button mode='primary' onClick={props.action} label='New Reply'>
      {props.text}
    </Button>
  </Center>
);
