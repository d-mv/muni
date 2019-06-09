import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { AppState } from "../store";
import { setStep } from "../store/app/actions";
import { indexedObjAny } from "../store/types";

import Page from "../layout/Page";
import Content from "../layout/Content";
import Section from "../layout/Section";
import Center from "../layout/Center";
import Paragraph from "../layout/Paragraph";
import Block from "../layout/Block";
import ButtonsWrapper from "../layout/ButtonsWrapper";
import Button from "../components/Button";
import Form from "../components/Form";
import formSection from "../modules/formSection";
import Steps from "../features/New/components/Steps";
import Message from "../components/Message";
import PhotoUpload from "../features/New/components/PhotoUpload";
import Label from "../layout/Label";
import Dropdown from "../components/Dropdown";

const New = (props: {
  language: indexedObjAny;
  step: number;
  setStep: (arg0: number) => void;
}) => {
  const { direction } = props.language;
  const { text } = props.language;
  const [step, setStep] = React.useState(1);
  // form fields
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [problem, setProblem] = React.useState("");
  const [solution, setSolution] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [link, setLink] = React.useState("");
  // message
  const [message, setMessage] = React.useState("");

  // ! remove
  const mockFn = () => {};

  const handleNextStep = () => {
    if (step + 1 <= 6) {
      let check: boolean = true;
      let response: string = text["new.message.fieldEmpty"];
      switch (step) {
        case 1:
          check = title !== "";
          break;
        case 2:
          check = category !== "";
          break;
        case 3:
          check = problem !== "";
          break;
        case 4:
          check = solution !== "";
          break;
        case 5:
          if (link) {
            const regex = new RegExp(
              "^([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
            );
            check = regex.test(link);
            if (!check) {
              response = text["new.message.urlMalformed"];
            }
          }
          break;
      }
      if (check) {
        setMessage("");
        setStep(step + 1);
      } else {
        setMessage(response);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    switch (event.target.name) {
      case "title":
        setTitle(event.target.value);
        break;
      case "category":
        setCategory(event.target.value);
        break;
      case "problem":
        setProblem(event.target.value);
        break;
      case "solution":
        setSolution(event.target.value);
        break;
      case "photo":
        setPhoto(event.target.value);
        break;
      case "link":
        setLink(event.target.value);
        break;
    }
  };
  const handleSubmit = () => {};

  const stepOne =
    step === 1
      ? formSection(
          text["new.field.title.label"],
          "text",
          "title",
          title,
          text["new.field.title.prompt"],
          handleInputChange,
          2
        )
      : null;

  // const stepTwo = step === 2 ?  <Dropdown /> : null;

  const stepTwo =
    step === 2
      ? formSection(
          text["new.field.category.label"],
          "text",
          "category",
          category,
          text["new.field.category.prompt"],
          handleInputChange
        )
      : null;

  const stepThree =
    step === 3
      ? formSection(
          text["new.field.problem.label"],
          "text",
          "problem",
          problem,
          text["new.field.problem.prompt"],
          handleInputChange,
          50
        )
      : null;
  const stepFour =
    step === 4
      ? formSection(
          text["new.field.solution.label"],
          "text",
          "solution",
          solution,
          text["new.field.solution.prompt"],
          handleInputChange
        )
      : null;
  const stepFive =
    step === 5 ? (
      <Section>
        <Label direction={direction} value={text["new.field.photo.label"]} />
        <PhotoUpload
          label={text["new.field.photo.prompt"]}
          direction={direction}
        />
        {formSection(
          text["new.field.link.label"],
          "url",
          "link",
          link,
          text["new.field.link.prompt"],
          handleInputChange
        )}
      </Section>
    ) : null;

  return (
    <Page opposite>
      <Content padded>
        <Section>
          <Center block>{text["new.steps.title"]}</Center>
          <Steps current={step} direction={direction} />
        </Section>
        <Paragraph>{text["new.steps.step.1"]}</Paragraph>

        <Block>
          <Form action={handleSubmit}>
            {stepOne}
            {stepTwo}
            {stepThree}
            {stepFour}
            {stepFive}
            <Message direction={direction} mode='attention' use='form'>
              {message}
            </Message>
          </Form>
        </Block>
        <ButtonsWrapper row direction={direction}>
          <Button mode='primary' action={handleNextStep}>
            {text["new.steps.button.next"]}
          </Button>
          <Button mode='cancel' action={mockFn}>
            {text["new.steps.button.cancel"]}
          </Button>
        </ButtonsWrapper>
      </Content>
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
