import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import * as TYPE from "../store/types";
import { setLanguage } from "../store/app/actions";
import { login, register, setModule } from "../store/users/actions";

import Loading from "../components/Loading";

import layout from "../styles/_layout.module.scss";
import form from "../styles/_form.module.scss";
import style from "../styles/Login.module.scss";

/** Functional component to render login/register page
 * @function Login
 * @param { locations: TYPE.apiResponse;
 *  loginResult: TYPE.apiResponse;
 * registerResult: TYPE.apiResponse;
 * language: TYPE.indexedObjAny;
 * data: TYPE.indexedObjAny;
 * login: (arg0: TYPE.login) => void;
 * register: (arg0: TYPE.register) => void;
 * setModule: (arg0: string) => void;
 * setLanguage: (arg0: string) => void} props - Object, containing functions & state from Redux
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
}) => {
  // get the language
  const { text, direction } = props.language;
  // loading hook
  const [loading, setLoading] = React.useState(false);
  // form data hooks
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  // ? const [locationLabel, setLocationLabel] = React.useState(
  //   props.locations.payload[0].label
  // );
  const [location, setLocation] = React.useState(
    props.locations.payload[0].value
  );
  const [fName, setFname] = React.useState("");
  const [lName, setLname] = React.useState("");
  // show/hide message hook
  const [showMessage, setShowMessage] = React.useState(true);
  // login/register mode hook
  const [mode, setMode] = React.useState("login");
  //  message hook
  const [message, setMessage] = React.useState("");

  // change mode upon if the code from API is 404 (user not found)
  React.useEffect(() => {
    props.loginResult.code === 404 ? setMode("register") : setMode("login");
  }, [props.loginResult.code]);

  // update message
  React.useEffect(() => {
    // switch off spinner
    if (props.loginResult.code !== 100) setLoading(false);
    // if this is not new user
    if (props.loginResult.code !== 404 && email !== "") {
      // set message to display, turn on display message
      setMessage(props.loginResult.message);
      setShowMessage(true);
    }
  }, [props.loginResult.message]);

  // register result
  React.useEffect(() => {
    // switch off spinner
    if (props.registerResult.code !== 100) {
      setLoading(false);
      // set message to display, turn on display message
      setMessage(props.registerResult.message);
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
    setLoading(!loading);
    setShowMessage(false);
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
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //? const handleInputChange = (event: any) => {
    //? if (!event.target) {
    //?   setLocationLabel(event.label);
    //?   setLocation(event.value);
    //? } else {
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
    // }
  };
  // handle location choice
  const handleSelectChange = (event: any) => {
    setLocation(event.target.value);
  };
  // handle change of language
  const handleLangChange = (e: any) => {
    props.setLanguage(e.target.value);
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
    <div className={form.message}>
      {message ? message : text["login.message.default"]}
    </div>
  ) : (
    <div className={form.message} />
  );

  let fNameElement = null;
  let lNameElement = null;
  let locationsElement = null;
  // register mode is on
  if (mode === "register") {
    fNameElement = (
      <section className={form.section}>
        <label>FIRST NAME</label>
        <input
          type='text'
          name='fName'
          value={fName}
          onChange={handleInputChange}
          required
        />
        <div className={form.prompt}>
          {fName ? "" : "enter your first name"}
        </div>
      </section>
    );

    lNameElement = (
      <section className={form.section}>
        <label>LAST NAME</label>
        <input
          type='text'
          name='lName'
          value={lName}
          onChange={handleInputChange}
          required
        />
        <div className={form.prompt}>{lName ? "" : "enter your last name"}</div>
      </section>
    );

    locationsElement = (
      <section className={form.section} onChange={handleSelectChange}>
        <label>LOCATION</label>
        <select>
          {props.locations.payload.map(
            (location: { [index: string]: string }) => {
              return (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              );
            }
          )}
        </select>
      </section>
    );
  }

  return (
    <main className={layout.mainOpposite}>
      <form
        className={direction === "rtl" ? form.right : form.left}
        onSubmit={handleSubmit}>
        {locationsElement}
        {fNameElement}
        {lNameElement}
        <section className={form.section}>
          <label>{text["login.label.email"]}</label>
          <input
            type='email'
            name='uMail'
            value={email}
            onChange={handleInputChange}
            required
          />
          <div className={form.prompt}>
            {email ? "" : text["login.prompt.email"]}
          </div>
        </section>
        <section className={form.section}>
          <label>{text["login.label.password"]}</label>
          <input
            type='password'
            minLength={7}
            name='uPass'
            value={pass}
            onChange={handleInputChange}
            required
          />
          <div className={form.prompt}>
            {pass ? "" : text["login.prompt.password"]}
          </div>
        </section>
        {messageElement}
        {showElement}
        <button className={form.buttonArea} aria-label='Submit'>
          <input
            className={form.buttonPrimary}
            type='button'
            disabled={loading}
            value={text["login.button.submit"]}
            id='submit_button'
          />
        </button>
        <button className={form.buttonSecondary}>
          {text["login.button.register"]}
        </button>
      </form>
      {/* language switcher */}
      <select className={style.langChanger} onChange={handleLangChange}>
        {Object.keys(props.data.language).map((lang: string) => (
          <option key={lang}>{lang}</option>
        ))}
      </select>
    </main>
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
  { login, register, setModule, setLanguage }
)(Login);
