import React, { useEffect, useState, Suspense } from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import axios from "axios";
import { AppState } from "../store";

import {
  setToken,
  checkToken,
  login,
  fetchData,
  getPosts,
  getMuniPosts
} from "../store/users/actions";
import { fetchLocations, setModule } from "../store/app/actions";
import { showPost } from "../store/post/actions";

import Loading from "../pages/Loading";

import {
  Confirmation,
  Welcome,
  Login,
  Register,
  Municipality,
  New,
  Profile,
  Home,
  Mine,
  Post
} from "./components/Factory";
import { data } from "../store/types";
import "../style/App.scss";
import { showPostPayload } from "../store/post/types";

const App = (props: {
  token: string;
  module: string;
  loginResult: data;
  help: boolean;
  vote: data;
  check: data;
  post: boolean;
  setModule: (arg0: string, arg1: string) => void;
  setToken: (arg0: string) => void;
  checkToken: (arg0: string) => void;
  data: data;
  locations: data;
  posttmp: data;
  fetchLocations: (props?: any) => any;
  fetchData: (arg0: string) => void;
  cookies: any;
  posts: data;
  showPost: (arg0: showPostPayload) => void;
  // prevModule: (arg0: string) => void;
  getPosts: (arg0: string) => void;
  getMuniPosts: (arg0: string) => void;
  type: any;
  userMuni: boolean;
}) => {
  const { token, userMuni, cookies } = props;
  const { location } = props.data;

  const [loading, setLoading] = useState(true);
  const [localToken, setLocalToken] = useState(token);

  const fetchPostsNews = () => {
    console.log("fetching petitions...");
    props.getPosts(location);
    console.log("fetching news...");
    props.getMuniPosts(location);
  };

  const toggleModule = (module: string) => {
    // props.prevModule(props.module);
    props.setModule(props.module, module);
  };

  // useEffect(() => {
  //   if (props.type && props.type === "muni") {
  //     const app: any = document.getElementById("app");
  //     app.style.backgroundColor = "var(--colorSecondary)";
  //   }
  // }, [props.type]);

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
      Object.keys(props.data).length === 0
    ) {
      console.log("- token is in state, but no data");
      cookies.set("token", props.token);
      props.fetchData(token);
    } else if (
      props.token !== "" &&
      props.token !== "clear" &&
      Object.keys(props.data).length > 0
    ) {
      console.log("- token is in state, data is present");
      fetchPostsNews();
      cookies.set("token", props.token);
    } else if (cookies.get("token") && cookies.get("token").length > 0) {
      console.log("- token is in cookies");
      props.checkToken(cookies.get("token"));
    } else {
      console.log("- no state, to cookie");
      toggleModule("welcome");
    }
  }, [token, cookies]);

  useEffect(() => {
    console.log("2. triggered module");
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
    if (Object.keys(props.data).length > 0 && props.posts.length > 0) {
      console.log("- location data & posts present, go home");
      toggleModule("home");
    } else if (
      Object.keys(props.data).length > 0 &&
      props.posts.length === 0 &&
      localToken != ""
    ) {
      console.log("- location data present, get posts");
      fetchPostsNews();
    }
  }, [props.data]);

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

  const config = { action: handleNewButtonClick, user: userMuni };

  let show = <Loading />;

  switch (props.module) {
    case "welcome":
      show = <Welcome config={config} />;
      break;
    case "login":
      show = <Login config={config} />;
      break;
    case "register":
      show = <Register config={config} locations={props.locations} />;
      break;
    case "confirmation":
      show = <Confirmation config={config} />;
      break;
    case "municipality":
      show = <Municipality config={config} />;
      break;
    case "new":
      show = <New muni={userMuni} config={config} />;
      break;
    case "profile":
      show = <Profile config={config} />;
      break;
    case "home":
      show = <Home config={config} />;
      break;
    case "mine":
      show = <Mine config={config} />;
      break;
    case "post":
      show = <Post config={config} />;
      break;
  }

  const content = loading ? <Loading /> : show;

  return content;
};

const mapStateToProps = (state: AppState) => {
  return {
    token: state.token,
    module: state.module,
    loginResult: state.login,
    data: state.locationData,
    locations: state.locations,
    help: state.help,
    vote: state.vote,
    check: state.checkTokenResult,
    post: state.post.show,
    posttmp: state.post,
    posts: state.posts,
    type: state.type,
    userMuni: state.type === "muni"
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
    getPosts,
    getMuniPosts
  }
)(withCookies(App));
