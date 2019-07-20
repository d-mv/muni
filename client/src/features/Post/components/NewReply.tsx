import React from "react";

import styles from "./style/NewReply.module.scss";
import Button from "../../../features/Button";
import Label from "../../../styles/form/Label";
import Area from "../../../styles/form/Area";

export const NewReply = (props: {
  value: string;
  label: string;
  placeholder: string;
  direction: string;
  submitText: string;
  action: (arg0: any) => void;
  submit: () => void;
}) => (
  <div className={styles.window}>
    <section className='section'>
      <Label direction={props.direction}>{props.label}</Label>
      <Area
        direction={props.direction}
        autoFocus={true}
        name='replyText'
        value={props.value}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          props.action(event)
        }
        placeholder={props.placeholder}
        rows={10}
      />
    </section>
    <Button mode='primary' onClick={props.submit} label="Submit">
      {props.submitText}
    </Button>
  </div>
);
