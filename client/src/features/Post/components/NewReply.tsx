import React from "react";

import { formSection } from "../../../components/formSection";

import styles from "./style/NewReply.module.scss";
import { placeholder } from "@babel/types";
import Button from "../../../components/Button";
import Label from "../../../layout/Label";

const NewReply = (props: {
  value: string;
  label: string;
  placeholder: string;
  direction: string;
  submitText: string;
  action: (arg0: any) => void;
  submit: () => void;
}) => {
  const { label, value, placeholder, action, direction } = props;
  return (
    <div className={styles.window}>
      <section className='section'>
        <Label direction={props.direction || "ltr"} value={props.label} />
        <textarea
          autoFocus={true}
          name='replyText'
          value={value}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            action(event)
          }
          placeholder={placeholder}
          rows={10}
        />
      </section>
      <Button mode='secondary' action={props.submit}>
        {props.submitText}
      </Button>
    </div>
  );
};

export default NewReply;
