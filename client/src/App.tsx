import React from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";

import { AppState } from "./store";
import { loadData } from "./store/app/actions";
import {
  setModule,
  setToken,
  checkToken,
  login,
  fetchLocations
} from "./store/users/actions";

import Loading from "./views/Loading";
import Welcome from "./views/Welcome";
import Navigation from "./components/Navigation/Navigation";
import Login from "./views/Login";
import Confirmation from "./views/Confirmation";
import style from "./styles/App.module.scss";

const App = (props: any) => {
  const [loading, setLoading] = React.useState(true);

  const { login } = props;
  const { cookies } = props;

  // check token cookie and if present - check token
  React.useEffect(() => {
    const cookieToken = cookies.get("token");
    // if token is set > go home
    if (props.token !== "") {
      props.setModule("home");
      setLoading(false);
    }
    // if no token, but there is non-empty cookie - check it
    else if (cookieToken && cookies.get("token").length > 0) {
      props.checkToken(cookies.get("token"));
    }
    // if no token, no cookie - show welcome
    else {
      setLoading(false);
    }
  }, [props.module === "welcome"]);

  // set cookies if token changes
  React.useEffect(() => {
    cookies.set("token");
    props.setModule("home");
    setLoading(false);
  }, [props.login.code === 200 && props.login.token]);
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
      {loading ? <Loading /> : show}
      {loading ? null : <Navigation />}
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
    loginResult: state.login,
    language: state.language
  };
};

export default connect(
  mapStateToProps,
  { setModule, setToken, checkToken, login, fetchLocations, loadData }
)(withCookies(App));
