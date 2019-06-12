import React from "react";
import { connect } from "react-redux";

import axios from "axios";
import { formSection, formSelection } from "../../modules/formSection";

import { AppState } from "../../store";
import { setStep } from "../../store/app/actions";
import { setModule } from "../../store/users/actions";
import { submitPost } from "../../store/post/actions";
import { indexedObjAny, data } from "../../store/types";

import Post from "../Post";

import Button from "../../components/Button";
import Form from "../../components/Form";
import Loading from "../../components/Loading";
import PhotoUpload from "./components/PhotoUpload";
import Steps from "./components/Steps";

import ButtonsWrapper from "../../layout/ButtonsWrapper";
import Center from "../../layout/Center";
import Content from "../../layout/Content";
import Label from "../../layout/Label";
import Section from "../../layout/Section";
import Paragraph from "../../layout/Paragraph";
import SubTitle from "../../layout/SubTitle";
import { Zero } from "../../layout/Utils";
import ContentBlock from "./components/ContentBlock";

const NewPost = (props: {
  language: data;
  locationData: data;
  token: string;
  step: number;
  submitResult: data;
  setStep: (arg0: number) => void;
  submitPost: (arg0: indexedObjAny) => void;
}) => {
  const { direction } = props.language;
  const { text } = props.language;
  const [step, setStep] = React.useState(props.step);
  const [review, setReview] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // form fields
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState(
    props.locationData.categories[0][props.language.short]
  );
  const [problem, setProblem] = React.useState("");
  const [solution, setSolution] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [link, setLink] = React.useState("");
  // message
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (step === 6 && review === false) {
      setReview(true);
    }
  }, [step]);

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

  const disableFormSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    const objectToSubmit: indexedObjAny = {
      user: props.locationData._id,
      location: props.locationData.location,
      token: props.token,
      post: {
        title,
        category,
        problem,
        solution,
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

    const url = "/post/create";
    axios
      .post(url, objectToSubmit)
      .then((response: any) => {
        setLoading(false);
        setMessage(response.data.message);
      })
      .catch(error => {
        const payload = error.response ? error.response.data : error.toString();
      });

    if (check === counter) {
      setLoading(true);
      // props.setStep(6);
      // props.submitPost(objectToSubmit);
    } else {
      setMessage(text["new.error.incomplete"]);
    }
  };

  let pageSubTitle = text["new.steps.title"];
  let stepsComponent = (
    <Steps current={step} direction={direction} action={handleAnyStep} />
  );
  let buttonPrimary = (
    <Button mode='primary' action={handleNextStep}>
      {text["new.steps.button.next"]}
    </Button>
  );

  if (step === 6) {
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
          "textarea",
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
      <Post
        preview
        post={{ title, category, problem, solution, photo, link }}
      />
    ) : null;
  const loadingElement = loading ? <Loading /> : null;
  return (
    <Content padded>
      <Center>
        <SubTitle title={pageSubTitle} direction={direction} />
        {stepsComponent}
      </Center>
      <Paragraph>{text["new.steps.step.1"]}</Paragraph>
      <ContentBlock
        stepOne={stepOne}
        stepTwo={stepTwo}
        stepThree={stepThree}
        stepFour={stepFour}
        stepFive={stepFive}
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
    // step: state.step,
    locationData: state.locationData,
    token: state.token,
    submitResult: state.submitPost,
    step: state.step
  };
};

export default connect(
  mapStateToProps,
  { setStep, submitPost }
)(NewPost);
