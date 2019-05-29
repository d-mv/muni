import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { login } from "../store/users/actions";

import layout from "../styles/_layout.module.scss";
import elements from "../styles/_elements.module.scss";
import style from "../styles/Login.module.scss";

const Login = (props: any) => {
  console.log(props);
  // login/register mode hook
  const [mode, setMode] = React.useState("login");
  // loading hook
  const [loading, setLoading] = React.useState(
    props.loginResult.status ? true : false
  );
  // form data hooks
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  // toggle the state of loading
  const toggleLoading = () => setLoading(!loading);

  // if mode === login don't show reg fields/buttons
  const buttonName = mode === "login" ? "Login" : "Register";
  const showElement = loading ? <div className={elements.loading} /> : null;
  const messageElement =
    props.loginResult.message && props.loginResult.code !== 404 ? (
      <div className={style.message}>{props.loginResult.message}</div>
    ) : null;
  
  // form methods
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        Please, enter your login details:
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
          <input type='button' value={buttonName} id='submit_button' />
        </button>
      </form>
    </main>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    loginResult: state.login
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
