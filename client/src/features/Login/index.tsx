import React, { useState } from "react";
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
import { type } from "os";
import styleFactory from "../../modules/style_factory";
import { clearScreenDown } from "readline";

/** Functional component to render login page content
 * @param {object} props - Object, containing functions & state from Redux
 * @returns {JSX.Element} - Login content
 */
const Login = (props: {
  registerResult: TYPE.apiResponse;
  language: TYPE.indexedObjAny;
  message: string;
  loading: boolean;
  typed: TYPE.indexedObj;
  login: (arg0: TYPE.login) => void;
  muniLogin: (arg0: TYPE.login) => void;
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
  // set message
  const [errorMessage, setErrorMessage] = useState('');
  // const [loading, setLoading] = useState(props.loading);
  // console.log(props.typed);

  // React.useEffect(() => {setLoading(props.loading) },[props.loading])

  // handle data submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setErrorMessage("");
    // props.setMessage('')
    // setLoading(true);
    // props.setLoading(true);
    const login: TYPE.login = {
      email,
      pass
    };
    if (props.desktop) {
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
    setErrorMessage("");
    if (name === "email") {
      setEmail(value);
      // props.typingData({ email: value });
    } else {
      setPass(value);
      // props.typingData({ pass: value });
    }
  };

  const handleSecondaryButton = () => {
    props.setModule("register");
    // setErrorMessage("");
    props.setMessage("");
    // setLoading(false);
    props.setLoading(false);
  };

  // set the form elements
  console.log("loading is " + props.loading);
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
    registerResult: state.register,
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
