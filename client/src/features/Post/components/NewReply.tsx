import React from "react";

import styles from "./style/NewReply.module.scss";
import Button from "../../../components/Button";
import Label from "../../../layout/Label";

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
      <Label direction={props.direction || "ltr"} value={props.label} />
      <textarea
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
    <Button mode='secondary' action={props.submit}>
      {props.submitText}
    </Button>
  </div>
);
