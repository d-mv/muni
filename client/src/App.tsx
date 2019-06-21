import React, { useEffect, useState, Suspense } from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import axios from "axios";
import { AppState } from "./store";

import {
  setModule,
  setToken,
  checkToken,
  login,
  fetchData
} from "./store/users/actions";
import { fetchLocations } from "./store/app/actions";
import { showPost } from "./store/post/actions";

import NewButton from "./features/New/components/NewButton";
import Navigation from "./features/Navigation";

import Loading from "./pages/Loading";
import Welcome from "./pages/Welcome";

import { data } from "./store/types";
import "./style/App.scss";
import { showPostPayload } from "./store/post/types";

const App = (props: {
  token: string;
  module: string;
  loginResult: data;
  help: boolean;
  vote: data;
  check: data;
  post: boolean;
  setModule: (arg0: string) => void;
  setToken: (arg0: string) => void;
  checkToken: (arg0: string) => void;
  location: data;
  locations: data;
  posttmp: data;
  fetchLocations: () => void;
  fetchData: (arg0: string) => void;
  cookies: any;
  showPost: (arg0: showPostPayload) => void;
}) => {
  const { token } = props;
  const { cookies } = props;
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState();
  axios.defaults.headers = { token };

console.log(props.module)

  // set cookies if token changes
  useEffect(() => {
    console.log(Object.keys(props.location).length);
    // if 'clear'
    if (props.token === "clear") {
      console.log(0);
      cookies.set("token", "");
      props.setToken("");
      props.setModule("welcome");
    } else if (
      props.token !== "" &&
      props.token !== "clear" &&
      Object.keys(props.location).length > 0
    ) {
      // if token IS
      cookies.set("token", props.token);
      console.log(5);
      props.setModule("home");
    } else if (props.token !== "" && props.token !== "clear") {
      props.fetchData(token);
    } else if (cookies.get("token") && cookies.get("token").length > 0) {
      console.log(2);
      props.checkToken(cookies.get("token"));
    } else {
      console.log("6 - no token, no cookie");
      props.setModule("welcome");
    }
  }, [token, cookies]);

  useEffect(() => {
    console.log(13);
    setLoading(false);
    if (props.module != "post") {
      // props.showPost({ show: false });
    }
  }, [props.module]);

  useEffect(() => {
    console.log(7);
    if (Object.keys(props.location).length > 0) {
      console.log("object");
      // props.setLanguage(props.location.lang);
      props.setModule("home");
    }
  }, [props.location]);

  useEffect(() => {
    console.log(12);
    if (props.post) {
      props.setModule("post");
    }
  }, [props.post]);

  useEffect(() => {
    console.log(10);
    // props.checkToken(cookies.get("token"));
    // console.log(props.check.status);
    // console.log(fetch);
    if (props.check.status) {
      // setFetch(true);
      props.fetchData(token);
    } else {
      // setFetch(false);
    }
  }, [props.check.status]);

  // fetch locations
  useEffect(() => {
    console.log(11);
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
  let show = <Loading />;
  switch (props.module) {
    case "welcome":
      show = componentFactory({ children: <Welcome />, nav: true });
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
    case "login":
      const Login = React.lazy(() => import("./pages/Enter"));
      show = componentFactory({
        children: <Login locations={locations} />,
        nav: true,
        lazy: true
      });
      break;
    case "register":
      const Register = React.lazy(() => import("./pages/Enter"));
      show = componentFactory({
        children: <Register register locations={locations} />,
        nav: true,
        lazy: true
      });
      break;
    case "post":
      const Post = React.lazy(() => import("./pages/Post"));
      show = componentFactory({
        children: <Post />,
        nav: true,
        lazy: true
      });
      break;
  }

  const content = loading ? <Loading /> : show

  return content;
};

const mapStateToProps = (state: AppState) => {
  return {
    token: state.token,
    module: state.module,
    loginResult: state.login,
    location: state.locationData,
    locations: state.locations,
    help: state.help,
    vote: state.vote,
    check: state.checkTokenResult,
    post: state.post.show,
    posttmp: state.post
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
    fetchData,
    showPost
  }
)(withCookies(App));
