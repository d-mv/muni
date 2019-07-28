import React, { useEffect, useState } from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import axios from "axios";

import { AppState } from "../store";
import { data } from "../store/types";
import { showPostPayload } from "../store/post/types";

import {
  setToken,
  checkToken,
  getCategories,
  typingData,
  setMessage
} from "../store/users/actions";
import { fetchLocations, setModule, setStep } from "../store/app/actions";
import {
  showPost,
  getPosts,
  getNews,
  setPosts,
  setNews,
  typingPost,
  clearPost
} from "../store/post/actions";

import logger from "../modules/logger";

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

import "../style/App.scss";
import { AuthState } from "../models";

const App = (props: {
  token: string;
  module: string;
  post: data;
  locations: data;
  cookies: any;
  posts: data;
  news: data;
  userMuni: boolean;
  auth: AuthState;
  categories: data;
  message: string;
  step: number;
  postsLoading: boolean;
  loading: boolean;
  clearPost: () => void;
  setMessage: (arg0: string) => void;
  getCategories: () => void;
  setModule: (previous: string, next: string) => void;
  setToken: (arg0: string) => void;
  checkToken: (arg0: string) => void;
  fetchLocations: (props?: any) => any;
  showPost: (arg0: showPostPayload) => void;
  getPosts: (arg0: string) => void;
  getNews: (arg0: string) => void;
  setPosts: (arg0: any) => void;
  setNews: (arg0: any) => void;
  typingData: (arg0: any) => void;
  setStep: (arg0: number) => void;
  typingPost: (arg0: { [index: string]: any }) => void;
}) => {
  const {
    token,
    userMuni,
    cookies,
    auth,
    posts,
    post,
    step,
    module,
    postsLoading
  } = props;

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchPostsNews = () => {
    if (!postsLoading) {
      logger({ text: "fetching", emph: "news", type: "positive" });
      props.getNews(auth.user.location);
      logger({ text: "fetching", emph: "categories", type: "positive" });
      // if (!Object(props.categories).keys)
      props.getCategories();
      logger({ text: "fetching", emph: "petitions", type: "positive" });
      props.getPosts(auth.user.location);
    }
  };

  useEffect(() => {
    if (props.postsLoading) {
      props.setMessage("fetching news & petitions...");
    } else {
      props.setMessage("");
    }
  }, [props.postsLoading]);

  const toggleModule = (module: string) => {
    props.setModule(props.module, module);
  };

  useEffect(() => {
    logger({ text: "main process is", emph: "launched", type: "positive" });

    if (token === "clear" && !props.loading) {
      logger({ text: "token is", emph: "clear", type: "attention" });
      cookies.set("token", "");
      toggleModule("welcome");
      props.setNews([]);
      props.setPosts([]);
    }

    if (auth.user._id && auth.user.location && token) {
      logger({ text: "auth is", emph: "true", type: "positive" });
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

      if (cookies.get("token") !== token) {
        logger({ text: "set token in", emph: "cookies" });
        setMessage("saving auth...");
        cookies.set("token", token);
      }

      setTimeout(() => {
        setMessage("fetching data...");
        fetchPostsNews();
      }, 1000);
    } else if (!token) {
      logger({ text: "auth is", emph: "false", type: "attention" });
      const cookie = cookies.get("token");

      if (cookie && cookie.length > 0) {
        logger({ text: "cookie is", emph: "true", type: "positive" });
        setMessage("checking cookie...");
        props.checkToken(cookie);
      } else if (!cookie && props.module === "welcome") {
        logger({ text: "cookie is", emph: "false", type: "attention" });
        // setLoading(false);
      }
      setMessage("fetching locations...");
      if (!Object(props.locations).keys) props.fetchLocations();
    }
  }, [auth, token]);

  useEffect(() => {
    logger({ text: "loactions has", emph: "changed" });
    if (props.locations.length > 0) {
      setMessage("");
    }
  }, [props.locations]);

  useEffect(() => {
    logger({ text: "auth has", emph: "changed" });

    if (
      module !== "post" &&
      // token !== "clear" &&
      auth.status &&
      module !== "home" &&
      module !== "new"
    ) {
      logger({ text: "switching to", emph: "changed", type: "positive" });
      toggleModule("home");
      setLoading(false);
    }
  }, [auth, posts]);

  // cleans data
  useEffect(() => {
    logger({ text: "module has", emph: "changed" });

    if (props.module === "home") {
      logger({ text: "module is home,", emph: "cleaning", type: "positive" });
      props.typingData({
        email: "",
        pass: "",
        location: "",
        fName: "",
        lName: "",
        secondPass: ""
      });
      props.typingPost({
        title: "",
        category: "",
        problem: "",
        solution: "",
        photo: "",
        link: ""
      });
      props.clearPost();
      if (step !== 1) props.setStep(1);
    } else if (props.module === "welcome") {
      // if (module !== "welcome" && !auth.status && !props.loading && !loading) {
      // toggleModule("welcome");
      setLoading(false);
      // }
    }
  }, [props.module]);

  useEffect(() => {
    logger({ text: "post has", emph: "changed" });

    if (props.post.show && props.module !== "post") {
      logger({ text: "switching to", emph: "post", type: "positive" });
      toggleModule("post");
    }
  }, [props.post]);

  const handleNewButtonClick = () => {
    toggleModule("new");
    if (props.post.type === "news")
      props.typingPost({ link: `news:${props.post._id}` });
  };

  const config = { action: handleNewButtonClick, user: userMuni };

  let show = <Loading message={message} />;

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
      show = <Post news={props.post.type === "news"} config={config} />;
      break;
  }

  const content = loading ? <Loading message={message} /> : show;

  return content;
};

const mapStateToProps = (state: AppState) => {
  return {
    token: state.token,
    module: state.module,
    locations: state.locations,
    post: state.post,
    posts: state.posts,
    news: state.news,
    userMuni: state.auth.user.type === "muni",
    auth: state.auth,
    categories: state.categories,
    message: state.message,
    step: state.step,
    postsLoading: state.postsLoading,
    loading: state.loading
  };
};

export default connect(
  mapStateToProps,
  {
    setModule,
    setToken,
    checkToken,
    fetchLocations,
    showPost,
    getPosts,
    getNews,
    getCategories,
    setPosts,
    setNews,
    typingData,
    setStep,
    typingPost,
    setMessage,
    clearPost
  }
)(withCookies(App));
