import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { AppState } from "../store";
import * as TYPE from "../store/types";
import { login } from "../store/users/actions";

// import locationsList from "../modules/locations_list";

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
  login: (arg0: TYPE.login) => void;
}) => {
  // loading hook
  const [loading, setLoading] = React.useState(false);
  // form data hooks
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [locationId, setLocationId] = React.useState("");
  const [fName, setFname] = React.useState("");
  const [lName, setLname] = React.useState("");
  // show/hide message hook
  const [showMessage, setShowMessage] = React.useState(true);
  // login/register mode hook
  const [mode, setMode] = React.useState("login");
  //  message hook
  const [message, setMessage] = React.useState("");
  // locations hook
  const [locations, setLocations] = React.useState(props.locations.payload);
  // change mode upon if the code from API is 404 (user not found)
  React.useEffect(() => {
    props.loginResult.code === 404 ? setMode("register") : setMode("login");
  }, [props.loginResult.code]);
  // update message
  React.useEffect(() => {
    // switch off spinner
    if (props.loginResult.code !== 100) toggleLoading();
    // if this is not new user
    if (props.loginResult.code !== 404) {
      // set meesage to display, turn on display message
      setMessage(props.loginResult.message);
      setShowMessage(true);
    }
  }, [props.loginResult.message]);

  // toggle the state of loading
  const toggleLoading = () => setLoading(!loading);

  // form methods
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowMessage(false);
    toggleLoading();
    props.login({ email, pass });
  };
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const handleInputChange = (event: any) => {
    console.log(event);
    if (!event.target) {
      setLocationId("5ce586e46eb133a4938298dc");
    } else {
      switch (event.target.name) {
        case "location":
          break;
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
  console.log(location);
  const locationsElement =
    mode === "register" ? (
      <Select
        value={location}
        name='location'
        options={locations}
        onChange={handleInputChange}
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
    locations: state.locations
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
