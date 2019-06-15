import React, { useEffect, useState, Suspense } from "react";
import { withCookies, ReactCookieProps } from "react-cookie";
import { connect } from "react-redux";
import axios from "axios";
import { AppState } from "./store";
import { loadData, setLocationData } from "./store/app/actions";
import {
  setModule,
  setToken,
  checkToken,
  login,
  fetchLocations,
  setAuth
} from "./store/users/actions";

import NewButton from "./features/New/components/NewButton";
import Navigation from "./features/Navigation";

import Loading from "./pages/Loading";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";

import { data } from "./store/types";
import "./style/App.scss";

const App = (props: {
  token: string;
  module: string;
  loginResult: data;
  help: boolean;
  vote: data;
  setModule: (arg0: string) => void;
  setToken: (arg0: string) => void;
  checkToken: (arg0: string) => void;
  // login;
  fetchLocations: () => void;
  cookies: any;
}) => {
  const { token } = props;
  const { cookies } = props;
  const [loading, setLoading] = useState(true);
  const [int, setInt] = useState(false);

  axios.defaults.headers = { token };

  // set cookies if token changes
  useEffect(() => {
    // if 'clear'
    if (props.token === "clear") {
      console.log(0);
      cookies.set("token", "");
      props.setToken("");
      props.setModule("welcome");
    } else if (props.token !== "" && props.token !== "clear") {
      // if token IS
      cookies.set("token", props.token);
      console.log(5);
      props.setModule("home");
    } else if (cookies.get("token") && cookies.get("token").length > 0) {
      console.log(2);
      props.checkToken(cookies.get("token"));
    } else {
      console.log("6 - no token, no cookie");
      props.setModule("welcome");
    }
  }, [token, cookies]);

  useEffect(() => {
    setLoading(false);
  }, [props.module]);

  // useEffect(() => {
  //   props.checkToken(cookies.get("token"));
  // }, [props.vote]);

  // fetch locations
  useEffect(() => {
    props.fetchLocations();
  }, []);

  const handleNewButtonClick = () => {
    props.setModule("new");
  };
  const AppComponent = (props: { children: any }) => (
    <div className='app'>{props.children}</div>
  );
  const LazyComponent = (props: { children: any }) => (
    <Suspense fallback={<Loading />}>{props.children}</Suspense>
  );

  const componentFactory = (CFProps: {
    children: any;
    lazy?: boolean;
    nav?: boolean;
    new?: boolean;
  }) => {
    const Help = React.lazy(() => import("./features/Help"));
    const help = props.help ? (
      <LazyComponent>
        <Help />
      </LazyComponent>
    ) : null;
    const nav = CFProps.nav ? <Navigation /> : null;
    const newButton = CFProps.new ? (
      <NewButton action={handleNewButtonClick} />
    ) : null;
    let content = CFProps.lazy ? (
      <AppComponent>
        {help}
        {nav}
        {newButton}
        <LazyComponent>{CFProps.children}</LazyComponent>
      </AppComponent>
    ) : (
      <AppComponent>
        {help}
        {nav}
        {newButton}
        {CFProps.children}
      </AppComponent>
    );
    return content;
  };
  let show;
  switch (props.module) {
    case "welcome":
      show = componentFactory({ children: <Welcome />, nav: true });
      break;
    case "login":
      show = componentFactory({ children: <Login />, nav: true });
      break;
    case "confirmation":
      const Confirmation = React.lazy(() => import("./pages/Confirmation"));
      show = componentFactory({
        children: <Confirmation />,
        nav: true,
        lazy: true
      });
      break;
    case "municipality":
      const Municipality = React.lazy(() => import("./pages/Municipality"));
      show = componentFactory({
        children: <Municipality />,
        nav: true,
        lazy: true,
        new: true
      });
      break;
    case "new":
      const New = React.lazy(() => import("./pages/New"));
      show = componentFactory({
        children: <New />,
        nav: true,
        lazy: true
      });
      break;
    case "profile":
      const Profile = React.lazy(() => import("./pages/Profile"));
      show = componentFactory({
        children: <Profile />,
        nav: true,
        lazy: true,
        new: true
      });
      break;
    case "home":
      const Home = React.lazy(() => import("./pages/Home"));
      show = componentFactory({
        children: <Home />,
        nav: true,
        lazy: true,
        new: true
      });
      break;
    case "mine":
      const Mine = React.lazy(() => import("./pages/Mine"));
      show = componentFactory({
        children: <Mine />,
        nav: true,
        lazy: true,
        new: true
      });
      break;
  }

  const content = loading ? <Loading /> : show || <Loading />;
  return content;
};

const mapStateToProps = (state: AppState) => {
  return {
    token: state.token,
    module: state.module,
    loginResult: state.login,
    help: state.help,
    vote: state.vote
  };
};

export default connect(
  mapStateToProps,
  {
    setModule,
    setToken,
    checkToken,
    login,
    fetchLocations
  }
)(withCookies(App));
