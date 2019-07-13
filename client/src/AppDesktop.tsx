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
  setMessage,
  getCategories
} from "./store/users/actions";
import { fetchLocations, setModule } from "./store/app/actions";
import { showPost, getPosts } from "./store/post/actions";

import NewButton from "./features/New/components/NewButton";
import Navigation from "./features/Navigation";

import Loading from "./pages/Loading";
import Welcome from "./pages/WelcomeDesktop";

import { data } from "./store/types";
import "./style/App.scss";
import { showPostPayload } from "./store/post/types";
import logger from "./modules/logger";

const App = (props: {
  user: data;
  token: string;
  module: string;
  // loginResult: data;
  help: boolean;
  vote: data;
  check: data;
  post: boolean;
  setModule: (arg0: string, arg1: string) => void;
  setToken: (arg0: string) => void;
  checkToken: (arg0: string) => void;
  // location: data;
  locations: data;
  posttmp: data;
  fetchLocations: (props?: any) => any;
  fetchData: (arg0: string) => void;
  cookies: any;
  posts: data;
  showPost: (arg0: showPostPayload) => void;
  getPosts: (arg0: string) => void;
  // type: any;
  getCategories: () => void;
  setMessage: (arg0: string) => void;
}) => {
  const { token, locations, user, cookies } = props;
  const [loading, setLoading] = useState(true);
  const [localToken, setLocalToken] = useState(token);
  const location = locations.filter((el: any) => el._id === user.location)[0];

  // const toggleModule = (module: string) => {
  //   props.setModule(props.module,module);
  // };

  // // set cookies if token changes
  // useEffect(() => {
  //   console.log("1. check token");
  //   axios.defaults.headers = { token };
  //   // if 'clear'
  //   if (props.token === "clear") {
  //     console.log("- clear token");
  //     cookies.set("token", "");
  //     props.setToken("");
  //     toggleModule("welcome");
  //   } else if (
  //     props.token !== "" &&
  //     props.token !== "clear" &&
  //     Object.keys(props.location).length === 0
  //   ) {
  //     console.log("- token is in state, but no data");

  //     props.fetchData(token);
  //   } else if (
  //     props.token !== "" &&
  //     props.token !== "clear" &&
  //     Object.keys(props.location).length > 0
  //   ) {
  //     console.log("- token is in state, data is present");
  //     props.getPosts(props.location.location);
  //     props.getNews(props.location.location);
  //     cookies.set("token", props.token);
  //   } else if (cookies.get("token") && cookies.get("token").length > 0) {
  //     console.log("- token is in cookies");
  //     props.checkToken(cookies.get("token"));
  //   }
  //   else {
  //     console.log("- no state, to cookie");
  //     toggleModule("welcome");
  //   }
  // }, [token, cookies]);

  // useEffect(() => {
  //   console.log("2. triggered module");
  //   // setLoading(false);
  //   if (props.module != "post") {
  //     console.log("- module is not post, clear it");

  //     props.showPost({ show: false });
  //   }
  //   if (props.module === "home") {
  //     console.log("- module is home");
  //     setLoading(false);
  //   }
  //   if (props.module === "welcome" && !cookies.get("token") && !token) {
  //     console.log("- module is welcome, no token whatsoever");
  //     setLoading(false);
  //   }
  // }, [props.module]);

  // useEffect(() => {
  //   console.log("3. triggered location");
  //   if (Object.keys(props.location).length > 0 && props.posts.length > 0) {
  //     console.log("- location data & posts present, go home");
  //     toggleModule("home");
  //   } else if (
  //     Object.keys(props.location).length > 0 &&
  //     props.posts.length === 0 &&
  //     localToken != ""
  //   ) {
  //     console.log("- location data present, get posts");

  //     props.getPosts(props.location.location);
  //     props.getNews(props.location.location);
  //   }
  // }, [props.location]);

  // useEffect(() => {
  //   console.log("6. triggered posts");
  //   if (props.posts.length > 0 && props.module !== "post") {
  //     console.log("- posts are there, show post");
  //     toggleModule("home");
  //   }
  // }, [props.posts]);

  // useEffect(() => {
  //   console.log("4. triggered post");
  //   if (props.post) {
  //     console.log("- post is there, show post");
  //     toggleModule("post");
  //   }
  // }, [props.post]);

  // useEffect(() => {
  //   console.log("4. check token status");
  //   if (props.check.status) {
  //     console.log("- token check is positive, set to local");
  //     setLocalToken(token);
  //     // props.fetchData(token);
  //   }
  // }, [props.check.status]);

  // useEffect(() => {
  //   if (props.locations.length === 0) {
  //     console.log("5. locations not available, get them");
  //     props.fetchLocations();
  //   }
  // });

  const fetchPostsNews = () => {
    logger({ text: "fetching", emph: "categories", type: "positive" });
    setMessage("fetching categories...");
    props.getCategories();
    logger({ text: "fetching", emph: "petitions", type: "positive" });
    setMessage("fetching petitions...");
    props.getPosts(user.location);
    logger({ text: "fetching", emph: "news", type: "positive" });
    setMessage("fetching news...");
    // props.getNews(user.location);
  };

  const toggleModule = (module: string) => {
    props.setModule(props.module, module);
  };

  useEffect(() => {
    logger({ text: "main process is", emph: "launched", type: "positive" });

    if (token === "clear") {
      cookies.set("token", "");
      props.setToken("");
      toggleModule("welcome");
    }

    if (user._id && user.location && token) {
      logger({ text: "auth is", emph: "true", type: "positive" });

      if (cookies.get("token") !== token) {
        logger({ text: "set token in", emph: "cookies" });
        setMessage("saving auth...");
        // set auth settings for axios
        cookies.set("token", token);
      }
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

      // if (posts.length < 1) {
      //   logger({ text: "posts are", emph: "false", type: "attention" });
      //   setMessage("fetching data...");
      //   fetchPostsNews();
      // }
    } else if (!token) {
      logger({ text: "auth is", emph: "false", type: "attention" });
      const cookie = cookies.get("token");

      if (cookie && cookie.length > 0) {
        logger({ text: "cookie is", emph: "true", type: "positive" });
        setMessage("checking cookie...");
        props.checkToken(cookie);
      } else if (!cookie && props.module === "welcome") {
        logger({ text: "cookie is", emph: "false", type: "attention" });

        setLoading(false);
      }
      setMessage("fetching locations...");
      props.fetchLocations();
    }
  }, [user, token]);

  useEffect(() => {
    console.log("2. triggered module");
    if (props.module != "post" && props.post) {
      console.log("- module is not post, clear it");
      props.showPost({ show: false });
    }
    if (props.module === "home") {
      console.log("- module is home");
      setLoading(false);
    }
  }, [props.module]);

  useEffect(() => {
    console.log("6. triggered posts");
    if (
      // props.posts.length > 0 &&
      props.module !== "post" &&
      token !== "clear" &&
      user._id.length > 0 &&
      props.module !== "home"
    ) {
      console.log("- posts are there, show post");
      toggleModule("home");
      setLoading(false);
    }
  }, [props.posts]);

  useEffect(() => {
    console.log("4. triggered post");
    if (props.post) {
      console.log("- post is there, show post");
      toggleModule("post");
    }
  }, [props.post]);

  const handleNewButtonClick = () => {
    toggleModule("new");
  };

  const AppComponent = (appProps: { children: any }) => (
    <div className={user.type === "muni" ? "appMuni" : "app"}>
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
    const newButton = CFProps.new ? <NewButton config={config} /> : null;
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
    user: state.auth,
    // location: state.locationData,
    locations: state.locations,
    help: state.help,
    vote: state.vote,
    check: state.checkTokenResult,
    post: state.post.show,
    posttmp: state.post,
    posts: state.posts
    // type: state.type
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
    setMessage,
    getCategories
  }
)(withCookies(App));
