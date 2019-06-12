import React from "react";

import ButtonsWrapper from "../../../layout/ButtonsWrapper";
import Button from "../../../components/Button";

import button from "../../../components/styles/Button.module.scss";

const ButtonsBlock = (props: {
  direction: string;
  loading: boolean;
  valuePrimary: string;
  actionSecondary: () => void;
  secondaryButton: React.FC;
}) => {
  return (
    <ButtonsWrapper column direction={props.direction}>
      <Button mode='form' submit disabled={props.loading} aria-label='Submit'>
        <input
          className={button.primary}
          type='button'
          value={props.valuePrimary}
          id='submit_button'
        />
      </Button>
      <Button mode='secondary' action={props.actionSecondary}>
        {props.secondaryButton}
      </Button>
    </ButtonsWrapper>
  );
};

export default ButtonsBlock;
