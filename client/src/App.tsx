import React, { Suspense } from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";

import { AppState } from "./store";
import { loadData, setLocationData } from "./store/app/actions";

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
import Login from "./views/Login";

const App = (props: any) => {
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [auth, setAuth] = React.useState(false);

  const { login } = props;
  const { cookies } = props;
  console.log(cookies.get("token"));
  // const cookieToken = cookies.get("token");

  // set cookies if token changes
  React.useEffect(() => {
console.log('hi')
    // if 'clear'
    if (props.token === "clear") {
      cookies.set("token", "");
      setToken("");
    } else if (props.token !== "" && props.token !== "clear") {
      // if token IS
      cookies.set("token", props.token);
      // setToken(props.token);
      console.log(5);
      props.setModule("home");
      setLoading(false);
      setAuth(true);
    } else if (
      cookies.get("token") &&
      cookies.get("token").length > 0
    ) {
      console.log(2);
      props.checkToken(cookies.get("token"));
    }
  }, [props.token]);

  // React.useEffect(() => {
  //   console.log(6);
  //   if (props.auth && !props.login.status && !props.token) {
  //     console.log(7);
  //     cookies.set("token", "");
  //     console.log("clearing token");
  //   }
  // }, [props.login.status]);

  // fetch locations
  React.useEffect(() => {
    props.fetchLocations();
  }, []);

  // React.useEffect(() => {
  //   if (props.auth) props.setModule("home");
  //   if (!props.auth) props.setModule("welcome");
  // }, [props.auth]);

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
    // login: state.login,
    module: state.module,
    // locations: state.locations,
    loginResult: state.login,
    language: state.language,
    locationData: state.locationData,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    setModule,
    setToken,
    checkToken,
    login,
    fetchLocations,
    loadData,
    setLocationData
  }
)(withCookies(App));
