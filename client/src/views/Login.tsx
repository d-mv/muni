import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { AppState } from "../store";
import * as TYPE from "../store/types";
import { login, register, setModule } from "../store/users/actions";

import layout from "../styles/_layout.module.scss";
import elements from "../styles/_elements.module.scss";
import style from "../styles/Login.module.scss";

/** Functional component to render login/register page
 * @function Login
 * @param { location:()=>void, login: (arg0:TYPE.login)=>void,loginResult:TYPE.apiResponse} props - Object, containing functions & state from redux
 * @returns {JSX.Element} - Login page
 */
const Login = (props: {
  locations: TYPE.apiResponse;
  loginResult: TYPE.apiResponse;
  registerResult: TYPE.apiResponse;
  login: (arg0: TYPE.login) => void;
  register: (arg0: TYPE.register) => void;
  setModule: (arg0: string) => void;
}) => {
  // loading hook
  const [loading, setLoading] = React.useState(false);
  // form data hooks
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [locationLabel, setLocationLabel] = React.useState("");
  const [location, setLocation] = React.useState("");
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

  // toggle the state of loading
  const toggleLoading = () => setLoading(!loading);

  const locations = props.locations.payload;

  // form methods
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toggleLoading();
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
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const handleInputChange = (event: any) => {
    if (!event.target) {
      setLocationLabel(event.label);
      setLocation(event.value);
    } else {
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
    }
  };

  // set the form elements
  const title =
    mode === "login" ? "Please, enter your login details:" : "New user:";
  const buttonName = mode === "login" ? "Login" : "Register";
  const showElement = loading ? <div className={elements.loading} /> : null;
  const messageElement = showMessage ? (
    <div className={style.message}>{message}</div>
  ) : null;
  const locationsElement =
    mode === "register" ? (
      <Select
        // value={locationLabel}
        name='location'
        options={locations}
        onChange={handleInputChange}
        placeholder='City'
        required
      />
    ) : null;
  const namesElement =
    mode === "login" ? null : (
      <label className={style.block}>
        <span className={style.label}>First and Last names</span>
        <input
          type='text'
          name='fName'
          value={fName}
          placeholder='First name'
          onChange={handleInputChange}
          required
        />
        <input
          type='text'
          name='lName'
          value={lName}
          placeholder='Last name'
          onChange={handleInputChange}
          required
        />
      </label>
    );

  return (
    <main className={layout.mainOpposite}>
      <form className={style.formRight} onSubmit={handleSubmit}>
        {title}
        {locationsElement}
        {namesElement}
        <label className={style.block}>
          <span className={style.label}>Email</span>
          <input
            type='email'
            name='uMail'
            value={email}
            placeholder='Email'
            onChange={handleInputChange}
            required
          />
        </label>
        <label className={style.block}>
          <span className={style.label}>Password</span>
          <input
            type='password'
            minLength={7}
            name='uPass'
            value={pass}
            placeholder='Password'
            onChange={handleInputChange}
            required
          />
        </label>
        {messageElement}
        {showElement}
        <button className={style.submit} aria-label={buttonName}>
          <input
            type='button'
            disabled={loading}
            value={buttonName}
            id='submit_button'
          />
        </button>
      </form>
    </main>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    loginResult: state.login,
    locations: state.locations,
    registerResult: state.register
  };
};

export default connect(
  mapStateToProps,
  { login, register, setModule }
)(Login);
