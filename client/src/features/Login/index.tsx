import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { formSection, formSelection } from "../../components/formSection";

import { AppState } from "../../store";
import * as TYPE from "../../store/types";
import {
  login,
  register,
  setModule,
  setMessage,
  setLoading,
  changeMode
} from "../../store/users/actions";

import Loading from "../../components/Loading";
import ButtonsWrapper from "../../layout/ButtonsWrapper";
import Button from "../../components/Button";
import button from "../../components/styles/Button.module.scss";

/** Functional component to render login/register page
 *
 * @param {object} props - Object, containing functions & state from Redux
 * @returns {JSX.Element} - Login page
 */
const LoginUser = (props: {
  locations: TYPE.apiResponse;
  loginResult: TYPE.apiResponse;
  registerResult: TYPE.apiResponse;
  language: TYPE.indexedObjAny;
  message: string;
  loading: boolean;
  mode: string;
  login: (arg0: TYPE.login) => void;
  register: (arg0: TYPE.register) => void;
  setModule: (arg0: string) => void;
  setMessage: (arg0: string) => void;
  setLoading: (arg0: boolean) => void;
  changeMode: (arg0: string) => void;
}) => {
  const { code, status, message } = props.registerResult;
  // get the language
  const { text, direction } = props.language;
  // loading hook
  // const [loading, setLoading] = useState(false);
  // form data hooks
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [prevLogin, setPrevLogin] = useState({ email: "", pass: "" });
  const [location, setLocation] = useState(props.locations.payload[0].value);
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");

  const [errorMessage, setErrorMessage] = useState(props.message);

  console.log(location);
  // * form methods
  // handle data submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(event)
    if (props.mode === "login") {
      props.login({ email, pass });
    } else {
      // register
      props.register({
        email,
        pass,
        location,
        fName,
        lName,
        lang: props.language.short
      });
    }
  };
  // handle fields input changes
  const handleInputChange = (event: any) => {
    setErrorMessage("");
    switch (event.target.name) {
      case "fName":
        setFname(event.target.value);
        break;
      case "lName":
        setLname(event.target.value);
        break;
      case "uPass":
        setPass(event.target.value);
        break;
      default:
        setEmail(event.target.value);
        break;
    }
  };
  // handle location choice
  const handleSelectChange = (event: any) => {
    console.log(event);
    setLocation(event.target.value);
  };

  const handleSecondaryButton = () => {
    props.setMessage("");
    props.changeMode(props.mode === "login" ? "register" : "login");
  };

  // set the form elements
  const showElement = props.loading ? (
    <div className='formLoading'>
      <Loading />
    </div>
  ) : (
    <div className='formMessage'>{errorMessage}</div>
  );

  // ) : (
  //   <div className='formMessage' />
  // );

  let emailElement = formSection({
    label: text["login.label.email"],
    type: "email",
    name: "uMail",
    value: email,
    placeholder: text["login.prompt.email"],
    action: handleInputChange
  });

  let passwordElement = formSection({
    label: text["login.label.password"],
    type: "password",
    name: "uPass",
    value: pass,
    placeholder: text["login.prompt.password"],
    action: handleInputChange,
    length: 7
  });
  let fNameElement = null;
  let lNameElement = null;
  let locationsElement = null;
  // register mode is on
  if (props.mode === "register") {
    locationsElement = formSelection({
      list: props.locations.payload,
      direction,
      label: text["login.label.location"],
      action: handleSelectChange
    });

    fNameElement = formSection({
      label: text["login.label.fName"],
      type: "text",
      name: "fName",
      value: fName,
      placeholder: text["login.prompt.fName"],
      action: handleInputChange,
      length: 2,
      focus: true
    });
    lNameElement = formSection({
      label: text["login.label.lName"],
      type: "text",
      name: "lName",
      value: lName,
      placeholder: text["login.prompt.lName"],
      action: handleInputChange,
      length: 3
    });
  }

  const secondaryButton =
    props.mode === "login"
      ? text["login.button.register"]
      : text["login.button.login"];

  return (
    <form
      className={direction === "rtl" ? "formRight" : "formLeft"}
      onSubmit={handleSubmit}>
      {/* visible during registration */}
      {locationsElement}
      {fNameElement}
      {lNameElement}
      {/* visible always */}
      {emailElement}
      {passwordElement}
      {/* message & loading */}
      {showElement}
      {/* buttons */}
      <ButtonsWrapper column direction={direction}>
        <Button mode='form' submit disabled={props.loading} aria-label='Submit'>
          <input
            className={button.primary}
            type='button'
            value={text["login.button.submit"]}
            id='submit_button'
          />
        </Button>
        <Button mode='secondary' action={handleSecondaryButton}>
          {secondaryButton}
        </Button>
      </ButtonsWrapper>
    </form>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    loginResult: state.login,
    locations: state.locations,
    registerResult: state.register,
    language: state.language,
    message: state.message,
    loading: state.loading,
    mode: state.mode
  };
};

export default connect(
  mapStateToProps,
  { login, register, setModule, setMessage, setLoading, changeMode }
)(LoginUser);
