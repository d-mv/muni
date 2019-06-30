import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { formSection } from "../../components/formSection";

import { AppState } from "../../store";
import * as TYPE from "../../store/types";
import {
  login,
  setModule,
  setMessage,
  setLoading,
  typingData,
  muniLogin
} from "../../store/users/actions";

import Loading from "../../components/Loading";
import ButtonsWrapper from "../../layout/ButtonsWrapper";
import Button from "../../components/Button";

import button from "../../components/style/Button.module.scss";
import styleFactory from "../../modules/style_factory";
<<<<<<< HEAD
import { LoginProps } from "../../store/users/types";
=======
import { clearScreenDown } from "readline";
>>>>>>> master

/** Functional component to render login page content
 * @param {object} props - Object, containing functions & state from Redux
 * @returns {JSX.Element} - Login content
 */
const Login = (props: {
  language: TYPE.indexedObjAny;
  message: string;
  loading: boolean;
  typed: TYPE.indexedObj;
  login: (arg0: LoginProps) => void;
  muniLogin: (arg0: LoginProps) => void;
  setModule: (arg0: string) => void;
  setMessage: (arg0: string) => void;
  setLoading: (arg0: boolean) => void;
  typingData: (arg0: TYPE.data) => void;
  desktop?: boolean;
}) => {
  // get the language[]
  const { text, direction } = props.language;
  // set local hooks
  const [email, setEmail] = useState(props.typed ? props.typed.email : "");
  const [pass, setPass] = useState(props.typed ? props.typed.pass : "");
<<<<<<< HEAD
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.message !== message) {
      setMessage(props.message);
    }
    if (props.loading !== loading) {
      setLoading(props.loading);
    }
  }, [props.message, props.loading]);
=======
  // set message
  const [errorMessage, setErrorMessage] = useState('');
  // const [loading, setLoading] = useState(props.loading);
  // console.log(props.typed);

  // React.useEffect(() => {setLoading(props.loading) },[props.loading])
>>>>>>> master

  // handle data submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
<<<<<<< HEAD
    props.setLoading(true);
    const login: LoginProps = {
=======
    // setErrorMessage("");
    // props.setMessage('')
    // setLoading(true);
    // props.setLoading(true);
    const login: TYPE.login = {
>>>>>>> master
      email,
      password: pass
    };
    if (props.desktop) {
      // TODO: refactor
      props.muniLogin(login);
    } else {
      props.login(login);
    }
  };

  // handle fields input changes
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    if (message) {
      props.setMessage("");
    }
    if (name === "email") {
      setEmail(value);
    } else {
      setPass(value);
    }
  };

  const handleSecondaryButton = () => {
<<<<<<< HEAD
    props.setMessage("");
    props.setModule("register");
  };

  // set the form elements
  const showElement = loading ? (
=======
    props.setModule("register");
    // setErrorMessage("");
    props.setMessage("");
    // setLoading(false);
    props.setLoading(false);
  };

  // set the form elements
  console.log("loading is " + props.loading);
  const showElement = props.loading ? (
>>>>>>> master
    <div className='formLoading'>
      <Loading />
    </div>
  ) : (
    <div className='formMessage'>{message}</div>
  );

  let emailElement = formSection({
    label: text["login.label.email"],
    type: "email",
    name: "email",
    value: email,
    placeholder: text["login.prompt.email"],
    action: handleInputChange,
    focus: !props.loading
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

  let loginStyle = direction === "rtl" ? "formRight" : "formLeft";
  if (props.desktop) loginStyle = styleFactory("formDesktop", direction);

  return (
    <form
      className={loginStyle}
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
        {props.desktop ? null : (
          <Button mode='secondaryFlat' action={handleSecondaryButton}>
            {text["login.button.register"]}
          </Button>
        )}
      </ButtonsWrapper>
    </form>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    message: state.message,
    loading: state.loading,
    typed: state.typed
  };
};

export default connect(
  mapStateToProps,
  { login, setModule, setMessage, setLoading, typingData, muniLogin }
)(Login);
