import React from "react";
import { connect } from "react-redux";

import { formSection, formSelection } from "../../modules/formSection";

import { AppState } from "../../store";
import { setStep } from "../../store/app/actions";
import { indexedObjAny } from "../../store/types";

import Post from "../Post";

import Button from "../../components/Button";
import Form from "../../components/Form";
import Steps from "./components/Steps";
import Message from "../../components/Message";
import PhotoUpload from "./components/PhotoUpload";

import Block from "../../layout/Block";
import ButtonsWrapper from "../../layout/ButtonsWrapper";
import Center from "../../layout/Center";
import Content from "../../layout/Content";
import Label from "../../layout/Label";
import Section from "../../layout/Section";
import Paragraph from "../../layout/Paragraph";
import SubTitle from "../../layout/SubTitle";
import { Zero } from "../../layout/Utils";

const NewPost = (props: {
  language: indexedObjAny;
  step: number;
  locationData: indexedObjAny;
  setStep: (arg0: number) => void;
}) => {
  const { direction } = props.language;
  const { text } = props.language;
  const [step, setStep] = React.useState(1);
  // form fields
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState(
    props.locationData.categories[0]._id
  );
  const [problem, setProblem] = React.useState("");
  const [solution, setSolution] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [link, setLink] = React.useState("");
  // message
  const [message, setMessage] = React.useState("");

  const getCategories = () => {
    let categories: Array<{ [index: string]: string }> = [];
    props.locationData.categories.map((cat: any) => {
      const language = !Object.keys(cat).includes(props.language.short)
        ? "en"
        : props.language.short;
      categories.push({ value: cat._id, label: cat[language] });
    });
    return categories;
  };

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

  const handleInputChange = (event: any) => {
    setMessage("");
    switch (event.target.name) {
      case "title":
        setTitle(event.target.value);
        break;
      case "problem":
        setProblem(event.target.value);
        break;
      case "solution":
        setSolution(event.target.value);
        break;
      case "link":
        setLink(event.target.value);
        break;
    }
  };
  const handleDropDown = (event: any) => {
    setCategory(event.target.value);
  };

  const handleSetPhoto = (props: any) => {
    setPhoto(props);
  };

  const handleSubmit = () => {};

  let pageSubTitle = text["new.steps.title"];
  let stepsComponent = <Steps current={step} direction={direction} />;
  switch (step) {
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      stepsComponent = <Zero />;
      pageSubTitle = text["new.preview"];
      break;
  }

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

  const stepTwo =
    step === 2
      ? formSelection(
          getCategories(),
          direction,
          text["new.field.category.label"],
          handleDropDown
        )
      : null;

  const stepThree =
    step === 3
      ? formSection(
          text["new.field.problem.label"],
          "textarea",
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
          action={handleSetPhoto}
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

  const preview =
    step === 6 ? (
      <Post post={{ title, category, problem, solution, photo, link }} />
    ) : null;

  return (
    <Content padded>
      <Center>
        <Center block>
          <SubTitle title={pageSubTitle} direction={direction} />
        </Center>
        {stepsComponent}
      </Center>
      <Paragraph>{text["new.steps.step.1"]}</Paragraph>
      <Block thin>
        <Form action={handleSubmit}>
          {stepOne}
          {stepTwo}
          {stepThree}
          {stepFour}
          {stepFive}
          {preview}
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
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    step: state.step,
    locationData: state.locationData
  };
};

export default connect(
  mapStateToProps,
  { setStep }
)(NewPost);
