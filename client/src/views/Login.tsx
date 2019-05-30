import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { login } from "../store/users/actions";

import layout from "../styles/_layout.module.scss";
import elements from "../styles/_elements.module.scss";
import style from "../styles/Login.module.scss";

const Login = (props: any) => {
  // login/register mode hook
  const [mode, setMode] = React.useState("login");
  // change mode upon if the code from API is 404 (user not found)
  React.useEffect(() => {
    props.loginResult.code === 404 ? setMode("register") : setMode("login");
  }, [props.loginResult.code]);
  // switch off loading when message received
  React.useEffect(() => {
    if (props.loginResult.message !== "") {
      toggleLoading();
    }
  }, [props.loginResult.message]);

  // message hook
  const [message, setMessage] = React.useState('')

  // update message
  React.useEffect(() => {
    if (props.loginResult.code !== 404) {
      setMessage(props.loginResult.message);
      setShowMessage(true)
    }
  }, [props.loginResult.message]);

  // loading hook
  const [loading, setLoading] = React.useState(
    props.loginResult.status ? true : false
  );
  // toggle the state of loading
  const toggleLoading = () => setLoading(!loading);

  // form data hooks
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  // show/hide message hook
  const [showMessage, setShowMessage] = React.useState(true)

  // set the form elements
  const title =
    mode === "login" ? "Please, enter your login details:" : "New user:";
  const buttonName = mode === "login" ? "Login" : "Register";
  const showElement = loading ? <div className={elements.loading} /> : null;
  const messageElement =
    showMessage ? (
      <div className={style.message}>{message}</div>
    ) : null;

  // form methods
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowMessage(false);
    toggleLoading();
    props.login({ email, pass });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      // case "uName":
      //   setUserName(event.target.value);
      //   break;
      case "uPass":
        setPass(event.target.value);
        break;
      default:
        setEmail(event.target.value);
        break;
    }
  };

  return (
    <main className={layout.mainOpposite}>
      <form className={style.formRight} onSubmit={handleSubmit}>
        {title}
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
