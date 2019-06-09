import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { setStep } from "../store/app/actions";
import { indexedObjAny } from "../store/types";

import Page from "../layout/Page";
import Section from "../layout/Section";
import Line from "../layout/Line";
import Center from "../layout/Center";
import Paragraph from "../layout/Paragraph";
import ButtonsWrapper from "../layout/ButtonsWrapper";
import Button from "../components/Button";

import Steps from "../features/New/components/Steps";

const New = (props: {
  language: indexedObjAny;
  step: number;
  setStep: (arg0: number) => void;
}) => {
  const { direction, text } = props.language;

  const mockFn = () => {};

  return (
    <Page opposite>
      <Section>
        <Center block>{text["new.steps.title"]}</Center>
        <Steps />
        <Paragraph>{text["new.steps.step.1"]}</Paragraph>
        <Paragraph>some fields</Paragraph>
      </Section>
      <ButtonsWrapper row direction={direction}>
        <Button mode='primary' action={mockFn}>
          {text["new.steps.button.next"]}
        </Button>
        <Button mode='cancel' action={mockFn}>
          {text["new.steps.button.cancel"]}
        </Button>
      </ButtonsWrapper>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    step: state.step
  };
};

export default connect(
  mapStateToProps,
  { setStep }
)(New);
