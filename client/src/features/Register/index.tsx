import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { formSection, formSelection } from "../../components/formSection";

import { AppState } from "../../store";
import * as TYPE from "../../store/types";
import {
  register,
  setModule,
  setMessage,
  setLoading
} from "../../store/users/actions";

import Loading from "../../components/Loading";
import ButtonsWrapper from "../../layout/ButtonsWrapper";
import Button from "../../components/Button";
import button from "../../components/style/Button.module.scss";
import Label from "../../layout/Label";

/** Functional component to render Register page content
 * @param {object} props - Object, containing functions & state from Redux
 * @returns {JSX.Element} - Register content
 */
const Register = (props: {
  locations: { value: string; label: string }[];
  storedLocations?: TYPE.data;
  language: TYPE.indexedObjAny;
  message: string;
  loading: boolean;
  register: (arg0: TYPE.register) => void;
  setModule: (arg0: string) => void;
  setMessage: (arg0: string) => void;
  typed: TYPE.indexedObj;
  setLoading: (arg0: boolean) => void;
}) => {
  // get the language
  const { text, direction } = props.language;
  const { locations } = props;

  const [email, setEmail] = useState(props.typed ? props.typed.email : "");
  const [pass, setPass] = useState(props.typed ? props.typed.pass : "");
  const [secondPass, setSecondPass] = useState("");
  // if there are locations - use the first one
  const defaultLocation = locations.length > 0 ? locations[0].value : "";
  const [location, setLocation] = useState(
    props.typed.location ? props.typed.location : defaultLocation
  );

  const [fName, setFname] = useState(props.typed ? props.typed.fName : "");
  const [lName, setLname] = useState(props.typed ? props.typed.lName : "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    if (props.message !== message) {
      setMessage(props.message);
    }
    if (props.loading !== loading) {
      setLoading(props.loading);
    }
  }, [props.message, props.loading]);

=======
  const [errorMessage, setErrorMessage] = useState(props.message);
>>>>>>> master
  // * form methods
  // handle data submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pass !== secondPass) {
      setMessage(text["register.passwords.dont-match"]);
    } else {
      props.setLoading(true);
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
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (message) {
      props.setMessage("");
    }
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
      case "secondPass":
        setSecondPass(value);
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

  // set the form elements
  const showElement = loading ? (
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

  const styles = {
    regular: {},
    notMatching: {
      border: ".1rem solid var(--colorAttention)"
    }
  };

  const locationsElement = formSelection({
    list: locations,
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
    focus: !props.loading
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
      <section className='section'>
      <Label
        direction={direction}
        value={text["login.label.password.repeat"]}
      />
      <input
        type='password'
        name='secondPass'
        value={secondPass}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event)
        }
        placeholder={text["login.prompt.password.repeat"]}
        minLength={7}
        required
        style={pass === secondPass ? styles.regular : styles.notMatching}
      />
    </section>
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
    loading: state.loading,
    typed: state.typed
  };
};

export default connect(
  mapStateToProps,
  { register, setModule, setMessage, setLoading }
)(Register);
