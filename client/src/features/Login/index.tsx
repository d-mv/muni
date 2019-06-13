import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { formSection, formSelection } from "../../components/formSection";

import { AppState } from "../../store";
import * as TYPE from "../../store/types";
import { setLanguage } from "../../store/app/actions";
import {
  login,
  register,
  setModule,
  fetchLocations
} from "../../store/users/actions";

import Loading from "../../components/Loading";
import ButtonsBlock from "./components/ButtonsBlock";

// import form from "../../style/_form.module.scss";

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
  data: TYPE.indexedObjAny;
  login: (arg0: TYPE.login) => void;
  register: (arg0: TYPE.register) => void;
  setModule: (arg0: string) => void;
  setLanguage: (arg0: string) => void;
  fetchLocations: () => void;
}) => {
  const { code, status, message } = props.registerResult;
  // get the language
  const { text, direction } = props.language;
  // loading hook
  const [loading, setLoading] = useState(false);
  // form data hooks
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [prevLogin, setPrevLogin] = useState({ email: "", pass: "" });
  const [location, setLocation] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  // show/hide message hook
  const [showMessage, setShowMessage] = useState(true);
  const [displayMessage, setDisplayMessage] = useState("");
  // login/register mode hook
  const [mode, setMode] = useState("login");

  // change mode upon if the code from API is 404 (user not found)
  React.useEffect(() => {
    if (props.loginResult.code === 404) {
      setDisplayMessage("");
      setLoading(false);
      setMode("register");
    }
  }, [props.loginResult.code]);

  // update message
  // React.useEffect(() => {
  //   if (props.loginResult.message !== "") {
  //     setDisplayMessage(props.loginResult.message);
  //     setLoading(false);
  //   }
  // }, [props.loginResult.message]);

  // register result
  React.useEffect(() => {
    // switch off spinner
    if (code !== 100) {
      setDisplayMessage("");
      setLoading(false);
      if (status) {
        props.setModule("confirmation");
      } else if (code !== 404) {
        setDisplayMessage(message);
      }
    }
  }, [message, code, status]);

  // * form methods
  // handle data submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisplayMessage("");
    setLoading(true);
    const check = prevLogin.email === email && prevLogin.pass === pass;
    if (mode === "login" && !check) {
      setPrevLogin({ email, pass });
      props.login({ email, pass });
    } else if (check) {
      setDisplayMessage("Same details.");
      setLoading(false);
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
    setLocation(event.target.value);
  };
  const setClear = () => {
    setEmail("");
    setPass("");
    setFname("");
    setLname("");
    setLocation("");
  };

  const handleSecondaryButton = () => {
    setMode(mode === "login" ? "register" : "login");
    if (mode === "register") {
      setClear();
    }
  };

  // set the form elements
  const showElement = loading ? (
    <div className='formLoading'>
      <Loading />
    </div>
  ) : (
    <div className='formLoading' />
  );
  const messageElement = displayMessage ? (
    <div className='formMessage'>{displayMessage}</div>
  ) : (
    <div className='formMessage' />
  );

  let emailElement = formSection({
    label: text["login.label.email"],
    type: "email",
    name: "uMail",
    value: email,
    placeholder: text["login.prompt.email"],
    action: handleInputChange,
    focus:true
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
  if (mode === "register") {
    locationsElement = formSelection({
      list: props.locations.payload,
      direction,
      label: text["login.label.location"],
      action: handleSelectChange,
      focus: true
    });

    fNameElement = formSection({
      label: text["login.label.fName"],
      type: "text",
      name: "fName",
      value: fName,
      placeholder: text["login.prompt.fName"],
      action: handleInputChange,
      length: 2
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
    mode === "login"
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
      {messageElement}
      {showElement}
      {/* buttons */}
      <ButtonsBlock
        direction={direction}
        loading={loading}
        valuePrimary={text["login.button.submit"]}
        actionSecondary={handleSecondaryButton}
        secondaryButton={secondaryButton}
      />
    </form>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    loginResult: state.login,
    locations: state.locations,
    registerResult: state.register,
    language: state.language,
    data: state.data
  };
};

export default connect(
  mapStateToProps,
  { login, register, setModule, setLanguage, fetchLocations }
)(LoginUser);
