import React from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";

import { AppState } from "./store";
import {
  setToken,
  checkToken,
  login,
  fetchLocations
} from "./store/users/actions";

import Welcome from "./views/Welcome";
import Navigation from "./components/Navigation/Navigation";
import Login from "./views/Login";
import Confirmation from "./views/Confirmation";

import style from "./styles/App.module.scss";

const App = (props: any) => {
  const { login } = props;
  // fetch locations
  React.useEffect(() => {
    props.fetchLocations();
  }, [login]);

  const home = <div data-testid='home' />;

  let show = home;
  switch (props.module) {
    case "welcome":
      show = <Welcome />;
      break;
    case "login":
      show = <Login />;
      break;
    case "confirmation":
      show = <Confirmation />;
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
    module: state.module,
    locations: state.locations,
    loginResult: state.login
  };
};

export default connect(
  mapStateToProps,
  { setToken, checkToken, login, fetchLocations }
)(withCookies(App));
