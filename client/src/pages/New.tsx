import React from "react";
import { connect } from "react-redux";

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
      let check;
      switch (step) {
        case 1:
          check = title !== "";
          break;
      }
      if (check) {
        setMessage("");
        setStep(step + 1);
      } else {
        setMessage(text["new.message.fieldEmpty"]);
      }
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage('')
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

  const titleField =
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
  const categoryField =
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

  const problemField =
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
  const solutionField =
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
  const photoField =
    step === 5
      ? formSection(
          text["new.field.photo.label"],
          "text",
          "photo",
          photo,
          text["new.field.photo.prompt"],
          handleInputChange
        )
      : null;
  const linkField =
    step === 5
      ? formSection(
          text["new.field.link.label"],
          "text",
          "link",
          link,
          text["new.field.link.prompt"],
          handleInputChange
        )
      : null;
  return (
    <Page opposite>
      <Content padded>
        <Section>
          <Center block>{text["new.steps.title"]}</Center>
          <Steps current={step} direction={direction} />
        </Section>
        <Paragraph>{text["new.steps.step.1"]}</Paragraph>

        {/* <form
          className={direction === "rtl" ? form.right : form.left}
          onSubmit={handleSubmit}>
          {titleField}
          {categoryField}
          {problemField}
          {solutionField}
          {photoField}
          {linkField}
        </form> */}
        <Block>
          <Form action={handleSubmit}>
            {titleField}
            {categoryField}
            {problemField}
            {solutionField}
            {photoField}
            {linkField}
            <Message direction={direction} mode='attention' use="form">
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
