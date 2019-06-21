import React from "react";

import styles from "./style/NewReplyButton.module.scss";
import Button from "../../../components/Button";

export const NewReplyButton = (props: { action: () => void }) => (
  <div className={styles.buttonWrapper}>
    <Button mode='primary' action={props.action}>
      new reply
    </Button>
  </div>
);
