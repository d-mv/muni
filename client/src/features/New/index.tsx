import React, { useEffect } from "react";
import { connect } from "react-redux";

import { formSection, formSelection } from "../../components/formSection";
import { Preview } from "./components";
import { AppState } from "../../store";
import { setStep } from "../../store/app/actions";
import { typingPost, createPost } from "../../store/post/actions";
import { setModule, setLoading } from "../../store/users/actions";
import { data } from "../../store/types";

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
import { categoryIdToName } from "../../modules/category_processor";

const NewPost = (props: {
  language: data;
  auth: data;
  categories: any;
  // locations: data;
  token: string;
  step: number;
  submitResult: data;
  setStep: (arg0: number) => void;
  // submitPost: (arg0: indexedObjAny) => void;
  setModule: (arg0: string) => void;
  prevModule: string;
  //
  loading: boolean;
  setLoading: (arg0: boolean) => void;
  typingPost: (arg0: { [index: string]: any }) => void;
  newPost: {
    title: "";
    category: "";
    problem: "";
    solution: "";
    photo: "";
    link: "";
  };
  createPost: (arg0: any) => void;
}) => {
  const { language, categories, newPost, typingPost, step, setStep } = props;
  const { direction, text, short } = language;
  const [review, setReview] = React.useState(false);
  // form fields
  const { title, category, problem, solution, photo, link } = newPost;
  // message
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    if (step === 6 && review === false) {
      setReview(true);
    }
  }, [step]);

  useEffect(() => {
    typingPost({ category: categories[0]._id });
  }, []);

  const getCategories = () => {
    let result: { value: string; label: string; desc: string }[] = [];
    Object.values(categories).map((value: any) => {
      result.push({
        value: value._id,
        label: value.name[short],
        desc: value.description[short]
      });
    });
    return result;
  };

  const handleNextStep = () => {
    let check = "";
    if (step + 1 <= 6) {
      let response: string = text["new.message.fieldEmpty"];
      switch (step) {
        case 1:
          check = title;
          break;
        case 2:
          check = category;
          break;
        case 3:
          check = problem;
          break;
        case 4:
          check = "_";
          break;
        case 5:
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
  const handleDropDown = (event: any) => {
    typingPost({ category: event.target.value });
  };

  const handleSetPhoto = (props: any) => {
    typingPost({ photo: props });
  };

  const handleSubmit = () => {
    props.createPost(newPost);
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

  const preparedCategories = getCategories();

  const stepTwo =
    step === 2 ? (
      <div className='none'>
        {formSelection({
          list: preparedCategories,
          direction,
          label: text["new.field.category.label"],
          action: handleDropDown,
          focus: true,
          value: category
        })}
        <CatDescription
          direction={direction}
          category={category}
          categories={preparedCategories}
        />
      </div>
    ) : null;

  const stepThree =
    step === 3
      ? formSection({
          label: text["new.field.problem.label"],
          type: "textarea",
          name: "problem",
          value: problem,
          placeholder: text["new.field.problem.prompt"],
          action: handleInputChange,
          length: 50,
          focus: false
        })
      : null;
  const stepFour =
    step === 4
      ? formSection({
          label: text["new.field.solution.label"],
          type: "textarea",
          name: "solution",
          value: solution,
          placeholder: text["new.field.solution.prompt"],
          action: handleInputChange,
          length: 50,
          focus: false
        })
      : null;
  const stepFive =
    step === 5 ? (
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

  const categoryName = categoryIdToName(
    categories,
    props.language.short,
    category
  );

  const post = {
    title,
    category: categoryName,
    problem,
    solution,
    photo,
    link
  };
  // TODO: fix below
  const preview =
    step === 6 ? (
      <Preview
        post={post}
        direction={direction}
        text={{
          problem: text["post.problem"],
          solution: text["post.solution"]
        }}
      />
    ) : null;
  const loadingElement = props.loading ? <Loading /> : null;

  const goHome = () => {
    props.setModule(props.prevModule);
  };
  const headerObject = {
    name: "New Post",
    left: { icon: <div>back</div>, action: goHome }
  };
  // console.log(message)
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
        stepFour={stepFour}
        stepFive={stepFive}
        preview={preview}
        loadingElement={loadingElement}
        direction={direction}
        message={message}
      />
      <ButtonsWrapper row direction={direction}>
        <Button mode='secondary' disabled={step === 1} action={handleBackStep}>
          {text["new.steps.button.back"]}
        </Button>
        {buttonPrimary}
      </ButtonsWrapper>
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
  { setStep, setModule, typingPost, setLoading, createPost }
)(NewPost);
