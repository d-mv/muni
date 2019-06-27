import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import { formSection, formSelection } from "../../components/formSection";
import { Preview } from "./components";
import { AppState } from "../../store";
import { setStep } from "../../store/app/actions";
import { submitPost } from "../../store/post/actions";
import { setModule } from "../../store/users/actions";
import { indexedObjAny, data } from "../../store/types";

import Button from "../../components/Button";
import Loading from "../../components/Loading";
import PhotoUpload from "./components/PhotoUpload";
import Steps from "./components/Steps";
import ContentBlock from "./components/ContentBlock";

import ButtonsWrapper from "../../layout/ButtonsWrapper";
import Center from "../../layout/Center";
import Content from "../../layout/Content";
import Label from "../../layout/Label";
import Section from "../../layout/Section";
import Paragraph from "../../layout/Paragraph";
import SubTitle from "../../layout/SubTitle";
import { Zero } from "../../layout/Utils";
import CatDescription from "./components/CatDescription";
import Header from "../../components/Header";
import { categoryIdToName } from "../../modules/category_processor";

const NewPost = (props: {
  language: data;
  location: data;
  token: string;
  step: number;
  submitResult: data;
  setStep: (arg0: number) => void;
  submitPost: (arg0: indexedObjAny) => void;
  setModule: (arg0: string) => void;
  prevModule: string;
}) => {
  const { direction, text } = props.language;
  const { _id, location } = props.location;
  const [step, setStep] = React.useState(props.step);
  const [review, setReview] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // form fields
  const [title, setTitle] = React.useState("");
  const [problem, setProblem] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [link, setLink] = React.useState("");
  // message
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (step === 6 && review === false) {
      setReview(true);
    }
  }, [step]);

  const handleNextStep = () => {
    if (step + 1 <= 4) {
      let check: boolean = true;
      let response: string = text["new.message.fieldEmpty"];
      switch (step) {
        case 1:
          check = title !== "";
          break;
        case 2:
          check = problem !== "";
          break;
        case 3:
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
    setMessage("");
    switch (event.target.name) {
      case "title":
        setTitle(event.target.value);
        break;
      case "problem":
        setProblem(event.target.value);
        break;
      case "link":
        setLink(event.target.value);
        break;
    }
  };

  const handleSetPhoto = (props: any) => {
    setPhoto(props);
  };

  const handleSubmit = () => {
    const objectToSubmit: indexedObjAny = {
      location,
      token: props.token,
      post: {
        title,
        problem,
        photo,
        link
      }
    };

    let check = 0;
    let counter = 0;

    // Object.keys(objectToSubmit).map((el: any) => {
    //   if (typeof objectToSubmit[el] === "object") {
    //     Object.keys(objectToSubmit[el]).map((ele: any) => {
    //       const empty = objectToSubmit[el][ele] === "";
    //       if (!empty) {
    //         check += 1;
    //       }
    //       counter += 1;
    //     });
    //   } else if (
    //     objectToSubmit[el] === "photo" ||
    //     objectToSubmit[el] === "link"
    //   ) {
    //     check += 1;
    //     counter += 1;
    //   } else {
    //     const empty = objectToSubmit[el] === "";
    //     if (!empty) {
    //       check += 1;
    //     }
    //     counter += 1;
    //   }
    // });

    const url = "/muni/create";
    axios
      .post(url, objectToSubmit)
      .then((response: any) => {
        setLoading(false);
        setMessage(response.data.message);
        if (response.status) {
          props.setModule("municipality");
        }
      })
      .catch(error => {
        console.log(error);
      });

    // if (check === counter) {
    //   setLoading(true);
    //   props.setStep(4);
    //   props.submitPost(objectToSubmit);
    // } else {
    //   setMessage(text["new.error.incomplete"]);
    // }
  };

  let pageSubTitle = text["new.steps.title"];
  let stepsComponent = (
    <Steps muni current={step} direction={direction} action={handleAnyStep} />
  );
  let buttonPrimary = (
    <Button mode='primary' action={handleNextStep}>
      {text["new.steps.button.next"]}
    </Button>
  );

  if (step === 4) {
    stepsComponent = <Zero />;
    pageSubTitle = text["new.preview"];
    buttonPrimary = (
      <Button mode='primary' action={handleSubmit}>
        {text["new.steps.button.submit"]}
      </Button>
    );
  }

  const stepOne =
    step === 1
      ? formSection({
          label: text["new.field.title.label"],
          type: "text",
          name: "title",
          value: title,
          placeholder: text["new.field.title.prompt"],
          action: handleInputChange,
          length: 2,
          focus: true
        })
      : null;

  const stepTwo =
    step === 2
      ? formSection({
          label: text["new.field.problem.label"],
          type: "textarea",
          name: "problem",
          value: problem,
          placeholder: text["new.field.problem.prompt"],
          action: handleInputChange,
          length: 50,
          focus: true
        })
      : null;

  const stepThree =
    step === 3 ? (
      <Section>
        <Label direction={direction} value={text["new.field.photo.label"]} />
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
          length: 5
        })}
      </Section>
    ) : null;

  const mockFn = (props: any) => {};

  const post = {
    title,
    problem,
    photo,
    link
  };
  // TODO: fix below
  const preview =
    step === 4 ? (
      <Preview
        muni
        post={post}
        direction={direction}
        text={{
          problem: text["post.problem"],
          solution: text["post.solution"]
        }}
      />
    ) : null;
  const loadingElement = loading ? <Loading /> : null;

  const goHome = () => {
    props.setModule(props.prevModule);
  };

  const headerObject = {
    name: "New Post",
    left: { icon: <div>back</div>, action: goHome }
  };

  console.log(message);
  return (
    <Content padded>
      {/* <Header {...headerObject} /> */}
      <Center>
        <SubTitle title={pageSubTitle} direction={direction} />
        {stepsComponent}
      </Center>
      <Paragraph direction={direction}>
        {text[`new.steps.step.${step}`]}
      </Paragraph>
      <ContentBlock
        stepOne={stepOne}
        stepTwo={stepTwo}
        stepThree={stepThree}
        preview={preview}
        loadingElement={loadingElement}
        direction={direction}
        message={message}
      />
      <ButtonsWrapper row direction={direction}>
        {buttonPrimary}
        <Button mode='secondary' disabled={step === 1} action={handleBackStep}>
          {text["new.steps.button.back"]}
        </Button>
      </ButtonsWrapper>
    </Content>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    location: state.locationData,
    token: state.token,
    submitResult: state.submitPost,
    step: state.step,
    prevModule: state.prevModule
  };
};

export default connect(
  mapStateToProps,
  { setStep, submitPost, setModule }
)(NewPost);