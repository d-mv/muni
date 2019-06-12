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

import Loading from "./pages/Loading";
import Navigation from "./features/Navigation";
import style from "./styles/App.module.scss";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import NewButton from "./features/New/components/NewButton";

const App = (props: any) => {
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [auth, setAuth] = React.useState(false);

  const { login } = props;
  const { cookies } = props;
  // console.log(cookies.get("token"));

  const fetch = () => setInterval(props.fetchLocations(), 1200000);

  React.useEffect(() => {
    if (!props.auth) {
      props.setModule("welcome")
      setLoading(false)
    }
  }, [props.auth])



  // set cookies if token changes
  React.useEffect(() => {
    // console.log("hi");
    // if 'clear'
    if (props.token === "clear") {
      cookies.set("token", "");
      setToken("");
      props.setModule('welcome')
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
    fetch();
  }, []);

  const handleNewButtonClick = () => {
    props.setModule("new");
  };

  let show;
  switch (props.module) {
    case "welcome":
      show = <Welcome />;
      break;
    case "login":
      show = <Login />;
      break;
    case "confirmation":
      const Confirmation = React.lazy(() => import("./pages/Confirmation"));
      show = (
        <Suspense fallback={<Loading />}>
          <Confirmation />;
        </Suspense>
      );
      break;
    case "municipality":
      const Municipality = React.lazy(() => import("./pages/Municipality"));
      show = (
        <Suspense fallback={<Loading />}>
          <Municipality />
        </Suspense>
      );
      break;
    case "new":
      const New = React.lazy(() => import("./pages/New"));
      show = (
        <Suspense fallback={<Loading />}>
          <New />
        </Suspense>
      );
      break;
    case "profile":
      const Profile = React.lazy(() => import("./pages/Profile"));
      show = (
        <Suspense fallback={<Loading />}>
          <Profile />
          <NewButton action={handleNewButtonClick} />
        </Suspense>
      );
      break;
    case "home":
      const Home = React.lazy(() => import("./pages/Home"));
      show = (
        <Suspense fallback={<Loading />}>
          <Home />
          <NewButton action={handleNewButtonClick} />
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
