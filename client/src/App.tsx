import React from "react";
import { withCookies, Cookies } from "react-cookie";
import { connect } from "react-redux";

import { AppState } from "./store";
import { setToken, checkToken, login } from "./store/users/actions";

import Welcome from "./views/Welcome";
import Navigation from "./components/Navigation/Navigation";
import Login from "./views/Login";

import style from "./styles/App.module.scss";

const App = (props: any) => {
  console.log(props);
  const { cookies } = props;
  console.log(cookies.get("token"));
  const useToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZTQ1MGE1ZDBkMGQ3ZWUzYzFlNmFlNyIsImlhdCI6MTU1ODUzNjU0MCwiZXhwIjoxNTYxMTI4NTQwfQ.2lP2928uxs11n0ZyfBnCeQ2FtAPi7Xq0hsy1Mx7G7RI";
  // cookies.set('token',useToken)
  // return (
  //   <div>
  //     <button onClick={() => props.checkToken(useToken)}>check token</button>
  //     <button
  //       onClick={() =>
  //         props.login({
  //           email: "Benjamin19@yahoo.com",
  //           pass: "1234567",
  //           location: "5ce2a3c945e5451171394b35"
  //         })
  //       }>
  //       login
  //     </button>
  //   </div>
  // );
  const home = <div data-testid='home' />;
  let show = home;
  switch (props.module) {
    case "welcome":
      show = <Welcome />;
      break;
    case "login":
      show = <Login />;
      break;
  }
  return (
    <div className={style.appWrapper}>
      {show}
      <Navigation />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    token: state.token,
    check: state.checkTokenResult,
    login: state.login,
    module: state.module
  };
};

export default connect(
  mapStateToProps,
  { setToken, checkToken, login }
)(withCookies(App));
