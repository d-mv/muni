import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import * as TYPE from "../store/types";
import { setLanguage } from "../store/app/actions";
import {
  login,
  register,
  setModule,
  fetchLocations
} from "../store/users/actions";

import Loading from "../components/Loading";
import Page from "../layout/Page";
import Button from "../components/Button";
import LangSwitch from "../components/LangSwitch";
import Dropdown from "../components/Dropdown";
import ButtonsWrapper from "../layout/ButtonsWrapper";
import {formSection,formSelection} from "../modules/formSection";

import form from "../styles/_form.module.scss";
import button from "../components/styles/Button.module.scss";
import style from "./styles/Login.module.scss";

/** Functional component to render login/register page
 *
 * @param {object} props - Object, containing functions & state from Redux
 * @returns {JSX.Element} - Login page
 */
const Login = (props: {
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
  // get the language
  const { text, direction } = props.language;
  // loading hook
  const [loading, setLoading] = React.useState(false);
  // form data hooks
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [fName, setFname] = React.useState("");
  const [lName, setLname] = React.useState("");
  // show/hide message hook
  const [showMessage, setShowMessage] = React.useState(true);
  // login/register mode hook
  const [mode, setMode] = React.useState("login");

  // change mode upon if the code from API is 404 (user not found)
  React.useEffect(() => {
    props.loginResult.code === 404 ? setMode("register") : setMode("login");
  }, [props.loginResult.code]);

  // update message
  React.useEffect(() => {
    if (props.loginResult.message !== "") {
      setLoading(false);
    }
  }, [props.loginResult.message]);

  // register result
  React.useEffect(() => {
    // switch off spinner
    if (props.registerResult.code !== 100) {
      setLoading(false);
      // set message to display, turn on display message
      // setMessage(props.registerResult.message);
      setShowMessage(false);
      if (props.registerResult.status) {
        props.setModule("confirmation");
      }
      setShowMessage(true);
    }
  }, [props.registerResult.message]);

  // * form methods
  // handle data submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowMessage(false);
    setLoading(true);
    if (mode === "login") {
      props.login({ email, pass });
    } else {
      // register
      props.register({
        email,
        pass,
        location,
        fName,
        lName,
        avatar: ""
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

  const handleSecondaryButton = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  // set the form elements
  const showElement = loading ? (
    <div className={form.loading}>
      <Loading />
    </div>
  ) : (
    <div className={form.loading} />
  );
  const messageElement = showMessage ? (
    <div className={form.message}>{props.loginResult.message}</div>
  ) : (
    <div className={form.message} />
  );

  let emailElement = formSection(
    text["login.label.email"],
    "email",
    "uMail",
    email,
    text["login.prompt.email"],
    handleInputChange
  );

  let passwordElement = formSection(
    text["login.label.password"],
    "password",
    "uPass",
    pass,
    text["login.prompt.password"],
    handleInputChange,
    7
  );
  let fNameElement = null;
  let lNameElement = null;
  let locationsElement = null;
  // register mode is on
  if (mode === "register") {
    locationsElement = (
      <Dropdown list={props.locations.payload} action={handleSelectChange} />
    );
    fNameElement = formSection(
      "FIRST NAME",
      "text",
      "fName",
      fName,
      "enter your first name",
      handleInputChange,
      2
    );
    lNameElement = formSection(
      "LAST NAME",
      "text",
      "lName",
      lName,
      "enter your last name",
      handleInputChange,
      3
    );
  }

  const secondaryButton =
    mode === "login"
      ? text["login.button.register"]
      : text["login.button.login"];

  return (
    <Page opposite>
      <form
        className={direction === "rtl" ? form.right : form.left}
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
        <ButtonsWrapper column direction={direction}>
          <Button mode='form' submit disabled={loading} aria-label='Submit'>
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
      <div className={style.langSwitch}>
        <LangSwitch />
      </div>
    </Page>
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
)(Login);
