import React, { Suspense } from "react";
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
import Navigation from "./components/Navigation/Navigation";
import style from "./styles/App.module.scss";

import Welcome from "./views/Welcome";
import Login from './views/Login'

const App = (props: any) => {
  console.log(props);
  const [loading, setLoading] = React.useState(false);
  const [auth, setAuth] = React.useState(false);

  const { login } = props;
  const { cookies } = props;
  // const cookieToken = cookies.get("token");

  // console.log(cookieToken);
  // check token cookie and if present - check token
  React.useEffect(() => {
    const cookieToken = cookies.get("token");
    // if token is set > go home
    if (props.token !== "") {
      props.setModule("home");
      setLoading(false);
    }
    // if no token, but there is non-empty cookie - check it
    else if (cookieToken !== undefined && cookies.get("token").length > 0) {
      props.checkToken(cookies.get("token"));
    }
    // if no token, no cookie - show welcome
    else {
      setLoading(false);
    }
  }, []);

  // set cookies if token changes
  React.useEffect(() => {
    cookies.set("token", props.token);
    if (props.token !== "") {
      console.log("changing token");
      props.setModule("home");
      setLoading(false);
      setAuth(true);
    }
  }, [props.token]);

  React.useEffect(() => {
    if (auth && !props.login.status && !props.token) {
      cookies.set("token", "");
      console.log("clearing token");
    }
  }, [props.login.status]);

  // fetch locations
  React.useEffect(() => {
    props.fetchLocations();
  },[]);

  let show;
  switch (props.module) {
    case "welcome":
      // const Welcome = React.lazy(() => import("./views/Welcome"));
      show = (
        // <Suspense fallback={<Loading />}>
          <Welcome />
        // </Suspense>
      );
      break;
    case "login":
      // const Login = React.lazy(() => import("./views/Login"));
      show = (
        // <Suspense fallback={<Loading />}>
          <Login />
        // </Suspense>
      );
      break;
    case "confirmation":
      const Confirmation = React.lazy(() => import("./views/Confirmation"));
      show = (
        <Suspense fallback={<Loading />}>
          <Confirmation />;
        </Suspense>
      );
      break;
    case "municipality":
      const Municipality = React.lazy(() => import("./views/Municipality"));
      show = (
        <Suspense fallback={<Loading />}>
          <Municipality />
        </Suspense>
      );
      break;
    case "new":
      const New = React.lazy(() => import("./views/New"));
      show = (
        <Suspense fallback={<Loading />}>
          <New />
        </Suspense>
      );
      break;
    case "profile":
      const Profile = React.lazy(() => import("./views/Profile"));
      show = (
        <Suspense fallback={<Loading />}>
          <Profile />
        </Suspense>
      );
      break;
    case "home":
      const Home = React.lazy(() => import("./views/Home"));
      show = (
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      );
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
    // locations: state.locations,
    loginResult: state.login,
    language: state.language
  };
};

export default connect(
  mapStateToProps,
  { setModule, setToken, checkToken, login, fetchLocations, loadData }
)(withCookies(App));
