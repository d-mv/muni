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
import NewButton from './components/NewButton'


const App = (props: any) => {
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [auth, setAuth] = React.useState(false);

  const { login } = props;
  const { cookies } = props;
  console.log(cookies.get("token"));

  const fetch = () => setInterval(props.fetchLocations(), 1200000);

  // set cookies if token changes
  React.useEffect(() => {
    console.log("hi");
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
    } else if (cookies.get("token") && cookies.get("token").length > 0) {
      console.log(2);
      props.checkToken(cookies.get("token"));
    } else {
      setLoading(false);
    }
  }, [props.token]);

  // fetch locations
  React.useEffect(() => {
  fetch()
  }, []);
  let show;
  switch (props.module) {

    case "welcome":
      show = (
        <Welcome />
      );
      break;
    case "login":
      show = (
        <Login />
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
          <NewButton />
        </Suspense>
      );
      break;
    case "home":
      const Home = React.lazy(() => import("./views/Home"));
      show = (
        <Suspense fallback={<Loading />}>
          <Home />
          <NewButton />
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
