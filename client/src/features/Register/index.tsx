import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { formSection, formSelection } from "../../components/formSection";

import { AppState } from "../../store";
import * as TYPE from "../../store/types";
import {
  register,
  setModule,
  setMessage,
  setLoading,
  typingData
} from "../../store/users/actions";

import Loading from "../../components/Loading";
import ButtonsWrapper from "../../layout/ButtonsWrapper";
import Button from "../../components/Button";
import button from "../../components/style/Button.module.scss";
import Label from "../../layout/Label";
import locationsList from "../../modules/locations_list";
import { LocationState } from "../../models";
import { indexedObjAny } from "../../store/types";

const Register = (props: {
  locations: LocationState;
  // storedLocations?: TYPE.data;
  language: indexedObjAny;
  message: string;
  loading: boolean;
  register: (arg0: TYPE.registerType) => void;
  setModule: (arg0: string) => void;
  setMessage: (arg0: string) => void;
  typed: TYPE.indexedObj;
  setLoading: (arg0: boolean) => void;
  typingData: (arg0: { [index: string]: any }) => void;
}) => {
  // get the language
  const { locations, language, message, loading, typed } = props;
  const { text, direction, short } = language;
  const { location, fName, lName, pass, secondPass, email } = typed;

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    props.typingData({ location: locations[0]._id });
  }, []);

  useEffect(() => {
    if (!fName && !lName && !location && !email && !pass && !secondPass) {
      setDisabled(true);
    } else if (
      fName &&
      lName &&
      location &&
      email &&
      pass &&
      secondPass &&
      pass === secondPass
    ) {
      setDisabled(false);
    }
  }, [fName, lName, location, email, pass, secondPass]);

  // * form methods
  // handle data submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // only if not loading & not disabled
    if (!loading && !disabled) {
      if (pass !== secondPass) {
        setMessage(text["register.passwords.dont-match"]);
      } else {
        // export interface UserType {
        //   _id: ObjectID;
        //   location: ObjectID;
        //   fName: string;
        //   lName: string;
        //   email: string;
        //   pass: string;
        //   type: UserKind;
        //   tokens: string[];
        //   settings: UserSettings;
        //   status: boolean;
        //   createdAt: Date;
        // }

        // props.setLoading(true);
        props.register({
          email,
          pass,
          location,
          fName,
          lName,
          settings: {
            language: props.language.short
          }
        });
      }
    }
  };

  // handle fields input changes
  const handleInputChange = (event: any) => {
    if (message) {
      props.setMessage("");
    }
    const { value } = event.target;
    let name = event.target.name;
    if (!name) name = "location";
    props.typingData({ [name]: value });
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
    value: typed[email],
    placeholder: text["login.prompt.email"],
    action: handleInputChange
  });

  let passwordElement = formSection({
    label: text["login.label.password"],
    type: "password",
    name: "pass",
    value: typed[pass],
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
    list: locationsList(locations, short),
    value: typed[location],
    direction,
    label: text["login.label.location"],
    action: handleInputChange
  });

  const fNameElement = formSection({
    label: text["login.label.fname"],
    type: "text",
    name: "fName",
    value: typed[fName],
    placeholder: text["login.prompt.fname"],
    action: handleInputChange,
    length: 2,
    focus: !props.loading
  });
  const lNameElement = formSection({
    label: text["login.label.lname"],
    type: "text",
    name: "lName",
    value: typed[lName],
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
          value={typed[secondPass]}
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
        <Button
          mode='form'
          submit
          disabled={disabled || loading}
          aria-label='Submit'>
          <input
            className={disabled ? button.disabled : button.primary}
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
    language: state.language,
    message: state.message,
    loading: state.loading,
    typed: state.typed
  };
};

export default connect(
  mapStateToProps,
  { register, setModule, setMessage, setLoading, typingData }
)(Register);
