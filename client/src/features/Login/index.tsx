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
  // locations: TYPE.apiResponse;
  // loginResult: TYPE.apiResponse;
  registerResult: TYPE.apiResponse;
  language: TYPE.indexedObjAny;
  message: string;
  loading: boolean;
  // mode: string;
  login: (arg0: TYPE.login) => void;
  register: (arg0: TYPE.register) => void;
  setModule: (arg0: string) => void;
  setMessage: (arg0: string) => void;
  setLoading: (arg0: boolean) => void;
  // changeMode: (arg0: string) => void;
}) => {
  // get the language
  const { text, direction } = props.language;
  // set local hooks
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  // set message
  const [errorMessage, setErrorMessage] = useState(props.message);

  // handle data submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const login: TYPE.login = { email: email, pass: pass };
    console.log(login);
    props.login(login);
  };
  console.log(email);
  // handle fields input changes
  const handleInputChange = (event: any) => {
    const { value, name } = event.target;
    console.log(value)
    console.log(name)
    setErrorMessage("");
    if (name === "email") {
      setEmail(value);
    } else {
      setPass(value);
    }
  };

  const handleSecondaryButton = () => {
    props.setModule("register");
    props.setMessage("");
  };

  // set the form elements
  const showElement = props.loading ? (
    <div className='formLoading'>
      <Loading />
    </div>
  ) : (
    <div className='formMessage'>{errorMessage}</div>
  );

  let emailElement = formSection({
    label: text["login.label.email"],
    type: "email",
    name: "email",
    value: email,
    placeholder: text["login.prompt.email"],
    action: handleInputChange,
    focus: true
  });

  let passwordElement = formSection({
    label: text["login.label.password"],
    type: "password",
    name: "pass",
    value: pass,
    placeholder: text["login.prompt.password"],
    action: handleInputChange,
    length: 7
  });

  return (
    <form
      className={direction === "rtl" ? "formRight" : "formLeft"}
      onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
        handleSubmit(event)
      }>
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
            value={text["login.button.login"]}
            id='submit_button'
          />
        </Button>
        <Button mode='secondary' action={handleSecondaryButton}>
          {text["login.button.register"]}
        </Button>
      </ButtonsWrapper>
    </form>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    // loginResult: state.login,
    // locations: state.locations,
    registerResult: state.register,
    language: state.language,
    message: state.message,
    loading: state.loading
    // mode: state.mode
  };
};

export default connect(
  mapStateToProps,
  { login, register, setModule, setMessage, setLoading, changeMode }
)(LoginUser);
