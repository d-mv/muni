import React from "react";
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
// import Button from "../../components/Button";
import Button from "../Button";

import button from "../../components/style/Button.module.scss";
import styleFactory from "../../modules/style_factory";
import { LoginProps } from "../../store/users/types";
import InLine from "../../styles/utils/InLine";

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
  const { typed, language, message, loading } = props;
  const { pass, email } = typed;
  const { text, direction } = language;

  // handle data submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (props.desktop) {
      // TODO: refactor
      props.muniLogin({
        email,
        pass
      });
    } else {
      props.login({
        email,
        pass
      });
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
    props.typingData({ [name]: value });
  };

  const handleSecondaryButton = () => {
    props.setMessage("");
    props.typingData({ email: "", pass: "" });
    props.setModule("register");
  };

  // set the form elements
  const showElement = loading ? (
    <div className='formLoading'>
      <Loading />
    </div>
  ) : (
    <div
      className={
        message === "Loading data..." ? "formMessagePos" : "formMessage"
      }>
      {message}
    </div>
  );

  let emailElement = formSection({
    label: text["login.label.email"],
    type: "email",
    name: "email",
    value: email,
    autoComplete: "username",
    placeholder: text["login.prompt.email"],
    action: handleInputChange,
    focus: !props.loading,
    direction: direction
  });

  let passwordElement = formSection({
    label: text["login.label.password"],
    type: "password",
    name: "pass",
    value: pass,
    autoComplete: "current-password",
    placeholder: text["login.prompt.password"],
    action: handleInputChange,
    length: 7,
    direction: direction
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
      {/* <ButtonsWrapper column direction={direction}> */}
      <InLine direction={direction} justify='space-around'>
        <Button mode='form' submit disabled={props.loading} label='Submit'>
          <input
            className='primaryButton'
            type='button'
            value={text["login.button.login"]}
            id='submit_button'
          />
        </Button>
        {props.desktop ? null : (
          <Button
            mode='secondary'
            onClick={handleSecondaryButton}
            label='Register'>
            {text["login.button.register"]}
          </Button>
        )}
      </InLine>
      {/* </ButtonsWrapper> */}
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
