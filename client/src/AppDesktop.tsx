import React, { useEffect, useState, Suspense } from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import axios from "axios";
import { AppState } from "./store";

import {
  setToken,
  checkToken,
  login,
  fetchData,
  getPosts,
  getNews
} from "./store/users/actions";
import { fetchLocations, setModule } from "./store/app/actions";
import { showPost } from "./store/post/actions";

import NewButton from "./features/New/components/NewButton";
import Navigation from "./features/Navigation";

import Loading from "./pages/Loading";
import Welcome from "./pages/WelcomeDesktop";

import { data } from "./store/types";
import "./style/App.scss";
import { showPostPayload } from "./store/post/types";

const App = (props: {
  token: string;
  module: string;
  // loginResult: data;
  help: boolean;
  vote: data;
  check: data;
  post: boolean;
  setModule: (arg0: string,arg1:string) => void;
  setToken: (arg0: string) => void;
  checkToken: (arg0: string) => void;
  location: data;
  locations: data;
  posttmp: data;
  fetchLocations: (props?: any) => any;
  fetchData: (arg0: string) => void;
  cookies: any;
  posts: data;
  showPost: (arg0: showPostPayload) => void;
  getPosts: (arg0: string) => void;
  getNews: (arg0: string) => void;
  type: any;
}) => {
  const { token } = props;
  const { cookies } = props;
  const [loading, setLoading] = useState(true);
  const [localToken, setLocalToken] = useState(token);

  const toggleModule = (module: string) => {
    props.setModule(props.module,module);
  };

  // set cookies if token changes
  useEffect(() => {
    console.log("1. check token");
    axios.defaults.headers = { token };
    // if 'clear'
    if (props.token === "clear") {
      console.log("- clear token");
      cookies.set("token", "");
      props.setToken("");
      toggleModule("welcome");
    } else if (
      props.token !== "" &&
      props.token !== "clear" &&
      Object.keys(props.location).length === 0
    ) {
      console.log("- token is in state, but no data");

      props.fetchData(token);
    } else if (
      props.token !== "" &&
      props.token !== "clear" &&
      Object.keys(props.location).length > 0
    ) {
      console.log("- token is in state, data is present");
      props.getPosts(props.location.location);
      props.getNews(props.location.location);
      cookies.set("token", props.token);
    } else if (cookies.get("token") && cookies.get("token").length > 0) {
      console.log("- token is in cookies");
      props.checkToken(cookies.get("token"));
    }
    else {
      console.log("- no state, to cookie");
      toggleModule("welcome");
    }
  }, [token, cookies]);

  useEffect(() => {
    console.log("2. triggered module");
    // setLoading(false);
    if (props.module != "post") {
      console.log("- module is not post, clear it");

      props.showPost({ show: false });
    }
    if (props.module === "home") {
      console.log("- module is home");
      setLoading(false);
    }
    if (props.module === "welcome" && !cookies.get("token") && !token) {
      console.log("- module is welcome, no token whatsoever");
      setLoading(false);
    }
  }, [props.module]);

  useEffect(() => {
    console.log("3. triggered location");
    if (Object.keys(props.location).length > 0 && props.posts.length > 0) {
      console.log("- location data & posts present, go home");
      toggleModule("home");
    } else if (
      Object.keys(props.location).length > 0 &&
      props.posts.length === 0 &&
      localToken != ""
    ) {
      console.log("- location data present, get posts");

      props.getPosts(props.location.location);
      props.getNews(props.location.location);
    }
  }, [props.location]);

  useEffect(() => {
    console.log("6. triggered posts");
    if (props.posts.length > 0 && props.module !== "post") {
      console.log("- posts are there, show post");
      toggleModule("home");
    }
  }, [props.posts]);

  useEffect(() => {
    console.log("4. triggered post");
    if (props.post) {
      console.log("- post is there, show post");
      toggleModule("post");
    }
  }, [props.post]);

  useEffect(() => {
    console.log("4. check token status");
    if (props.check.status) {
      console.log("- token check is positive, set to local");
      setLocalToken(token);
      // props.fetchData(token);
    }
  }, [props.check.status]);

  useEffect(() => {
    if (props.locations.length === 0) {
      console.log("5. locations not available, get them");
      props.fetchLocations();
    }
  });

  const handleNewButtonClick = () => {
    toggleModule("new");
  };

  const AppComponent = (appProps: { children: any }) => (
    <div className={props.type === "muni" ? "appMuni" : "app"}>
      {appProps.children}
    </div>
  );
  const LazyComponent = (props: { children: any }) => (
    <Suspense fallback={<Loading />}>{props.children}</Suspense>
  );
  const config = { action: handleNewButtonClick, user: true };

  const componentFactory = (CFProps: {
    children: any;
    lazy?: boolean;
    nav?: boolean;
    new?: boolean;
  }) => {
    const nav = CFProps.nav ? <Navigation /> : null;
    const newButton = CFProps.new ? (
      <NewButton config={config} />
    ) : null;
    let content = CFProps.lazy ? (
      <AppComponent>
        {/* {help} */}
        {/* {nav} */}
        {/* {newButton} */}
        <LazyComponent>{CFProps.children}</LazyComponent>
      </AppComponent>
    ) : (
      <AppComponent>
        {/* {help} */}
        {/* {nav} */}
        {/* {newButton} */}
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
    case "home":
      const Home = React.lazy(() => import("./pages/HomeDesktop"));
      show = componentFactory({
        children: <Home />,
        nav: true,
        lazy: true,
        new: true
      });
      break;
    case "login":
      const Login = React.lazy(() => import("./pages/Enter"));
      show = componentFactory({
        children: <Login desktop />,
        nav: true,
        lazy: true
      });
      break;
  }

  const content = loading ? <Loading /> : show;

  return content;
};

const mapStateToProps = (state: AppState) => {
  return {
    token: state.token,
    module: state.module,
    auth: state.auth,
    location: state.locationData,
    locations: state.locations,
    help: state.help,
    vote: state.vote,
    check: state.checkTokenResult,
    post: state.post.show,
    posttmp: state.post,
    posts: state.posts,
    type: state.type
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
    showPost,
    // prevModule,
    getPosts,
    getNews
  }
)(withCookies(App));
