import React, { useEffect } from "react";
import { connect } from "react-redux";

import { formSection } from "../../components/formSection";
import { Preview, PreviewBlock } from "./components";
import { AppState } from "../../store";
import { setStep } from "../../store/app/actions";
import { createNews, typingPost } from "../../store/post/actions";
import { setModule } from "../../store/users/actions";
import { data } from "../../store/types";

import Button from "../Button";
import Loading from "../../components/Loading";
import PhotoUpload from "./components/PhotoUpload";
import Steps from "./components/Steps";
import ContentBlock from "./components/ContentBlock";

import ButtonsWrapper from "../../layout/ButtonsWrapper";
import Center from "../../layout/Center";
import Content from "../../layout/Content";
import Label from "../../styles/form/Label";
import Section from "../../layout/Section";
import Paragraph from "../../layout/Paragraph";
import SubTitle from "../../layout/SubTitle";
import { Zero } from "../../layout/Utils";
import { AuthState } from "../../models";
import InLine from "../../styles/utils/InLine";
import Message from "../../styles/form/Message";
import InColumn from "../../styles/utils/InColumn";
// import Switch from "../../styles/form/Switch";

import SwitchComponent from "../../components/Switch";
import Spacer from "../../styles/utils/Spacer";
import SwitchLine from "../../styles/form/SwitchTitle";

const NewPost = (props: {
  language: data;
  auth: AuthState;
  token: string;
  step: number;
  setStep: (arg0: number) => void;
  setModule: (arg0: string) => void;
  prevModule: string;
  //
  loading: boolean;
  typingPost: (arg0: { [index: string]: any }) => void;
  newPost: any;
  createNews: (arg0: any) => void;
}) => {
  const { language, newPost, typingPost, loading, step, setStep } = props;
  const { direction, text, short } = language;
  const [review, setReview] = React.useState(false);
  // form fields
  const { title, photo, link, pinned } = newPost;
  // message
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    if (step === 6 && review === false) {
      setReview(true);
    }
  }, [step]);

  const handleNextStep = () => {
    let check = "";
    if (step + 1 <= 4) {
      let response: string = text["new.message.fieldEmpty"];
      switch (step) {
        case 1:
          check = title;
          break;
        case 2:
          check = props.newPost.text;
          break;
        case 3:
          check = "_";
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
  // console.log(step);
  const handleBackStep = () => {
    if (step - 1 > 0) {
      setStep(step - 1);
    }
  };

  const handleAnyStep = (newStep: number) => {
    if (review) {
      setStep(newStep);
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setMessage("");
    typingPost({ [name]: value });
  };

  const handleSetPhoto = (props: any) => {
    typingPost({ photo: props });
  };

  const handleSubmit = () => {
    props.createNews(newPost);
  };

  let pageSubTitle = text["new.muni.steps.title"];
  let stepsComponent = (
    <Steps muni current={step} direction={direction} action={handleAnyStep} />
  );
  let buttonPrimary = (
    <Button mode='primary' onClick={handleNextStep} label='Next'>
      {text["new.steps.button.next"]}
    </Button>
  );

  if (step === 4) {
    stepsComponent = <Zero />;
    pageSubTitle = text["new.preview"];
    buttonPrimary = (
      <Button mode='primary' onClick={handleSubmit} label='Submit'>
        {text["new.steps.button.submit"]}
      </Button>
    );
  }

  const togglePinned = () => typingPost({ pinned: !pinned });
  const stepOne =
    step === 1
      ? formSection({
          label: text["new.muni.field.title.label"],
          type: "text",
          name: "title",
          value: title,
          placeholder: text["new.muni.field.title.prompt"],
          action: handleInputChange,
          length: 2,
          focus: true,
          direction: direction
        })
      : null;

  const stepTwo =
    step === 2
      ? formSection({
          label: text["new.muni.field.text.label"],
          type: "textarea",
          name: "text",
          value: props.newPost.text,
          placeholder: text["new.muni.field.text.prompt"],
          action: handleInputChange,
          length: 50,
          focus: false,
          direction: direction
        })
      : null;

  const stepThree =
    step === 3 ? (
      <Section>
        <Label direction={direction}>{text["new.field.photo.label"]}</Label>
        <PhotoUpload
          label={text["new.field.photo.prompt"]}
          direction={direction}
          action={handleSetPhoto}
          photo={photo}
        />
        {formSection({
          label: text["new.field.link.label"],
          type: "url",
          name: "link",
          value: link,
          placeholder: text["new.field.link.prompt"],
          action: handleInputChange,
          length: 5,
          direction: direction
        })}
      </Section>
    ) : null;

  const mockFn = (props: any) => {};

  const post = {
    title,
    problem: props.newPost.text,
    photo,
    link
  };
  const preview =
    step === 4 ? (
      <PreviewBlock
        muni
        post={post}
        direction={direction}
        onChange={togglePinned}
        text={text["new.muni.preview.pinned"]}
        pinned={pinned}
      />
    ) : null;

  const loadingElement = loading ? <Loading /> : null;

  return (
    <Content padded>
      <Center>
        <SubTitle title={pageSubTitle} direction={direction} />
        {step > 3 ? null : stepsComponent}
      </Center>
      {step > 3 ? null : (
        <Paragraph direction={direction}>
          {text[`new.muni.steps.step.${step}`]}
        </Paragraph>
      )}
      {step > 3 ? null : (
        <ContentBlock
          stepOne={stepOne}
          stepTwo={stepTwo}
          stepThree={stepThree}
          preview={preview}
          loadingElement={loadingElement}
          direction={direction}
          message={message}
        />
      )}
      {preview}
      <Message direction={direction}>{message}</Message>
      <InLine direction={direction} justify='space-around'>
        {buttonPrimary}
        <Button
          mode='secondary'
          disabled={step === 1}
          onClick={handleBackStep}
          label='Back'>
          {text["new.steps.button.back"]}
        </Button>
      </InLine>
    </Content>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    auth: state.auth,
    language: state.language,
    categories: state.categories,
    locations: state.locations,
    token: state.token,
    submitResult: state.submitPost,
    step: state.step,
    prevModule: state.prevModule,
    newPost: state.newPost,
    loading: state.loading
  };
};

export default connect(
  mapStateToProps,
  { setStep, setModule, createNews, typingPost }
)(NewPost);
