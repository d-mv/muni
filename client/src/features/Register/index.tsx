import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { formSection, formSelection } from "../../components/formSection";

import { AppState } from "../../store";
import * as TYPE from "../../store/types";
import { register, setModule, setMessage } from "../../store/users/actions";

import Loading from "../../components/Loading";
import ButtonsWrapper from "../../layout/ButtonsWrapper";
import Button from "../../components/Button";
import button from "../../components/style/Button.module.scss";

/** Functional component to render login/register page
 *
 * @param {object} props - Object, containing functions & state from Redux
 * @returns {JSX.Element} - Login page
 */
const LoginUser = (props: {
  locations: TYPE.apiResponse;
  language: TYPE.indexedObjAny;
  message: string;
  loading: boolean;
  register: (arg0: TYPE.register) => void;
  setModule: (arg0: string) => void;
  setMessage: (arg0: string) => void;
}) => {
  // get the language
  const { text, direction } = props.language;

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [location, setLocation] = useState(
    props.locations.payload[0].value || ""
  );
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");

  const [errorMessage, setErrorMessage] = useState(props.message);

  // * form methods
  // handle data submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.register({
      email,
      pass,
      location,
      fName,
      lName,
      lang: props.language.short
    });
  };
  // handle fields input changes
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrorMessage("");
    const { value, name } = event.target;
    switch (name) {
      case "fName":
        setFname(value);
        break;
      case "lName":
        setLname(value);
        break;
      case "pass":
        setPass(value);
        break;
      default:
        setEmail(value);
        break;
    }
  };
  // handle location choice
  const handleSelectChange = (event: any) => {
    setLocation(event.target.value);
  };

  const handleSecondaryButton = () => {
    props.setModule("login");
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
    action: handleInputChange
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

  const locationsElement = formSelection({
    list: props.locations.payload || [],
    direction,
    label: text["login.label.location"],
    action: handleSelectChange
  });

  const fNameElement = formSection({
    label: text["login.label.fname"],
    type: "text",
    name: "fName",
    value: fName,
    placeholder: text["login.prompt.fname"],
    action: handleInputChange,
    length: 2,
    focus: true
  });
  const lNameElement = formSection({
    label: text["login.label.lname"],
    type: "text",
    name: "lName",
    value: lName,
    placeholder: text["login.prompt.lname"],
    action: handleInputChange,
    length: 3
  });

  return (
    <form
      className={direction === "rtl" ? "formRight" : "formLeft"}
      onSubmit={handleSubmit}>
      {/* visible during registration */}
      {locationsElement}
      {fNameElement}
      {lNameElement}
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
            value={text["login.button.register"]}
            id='submit_button'
          />
        </Button>
        <Button mode='secondaryFlat' action={handleSecondaryButton}>
          {text["login.button.login"]}
        </Button>
      </ButtonsWrapper>
    </form>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    locations: state.locations,
    registerResult: state.register,
    language: state.language,
    message: state.message,
    loading: state.loading
  };
};

export default connect(
  mapStateToProps,
  { register, setModule, setMessage }
)(LoginUser);