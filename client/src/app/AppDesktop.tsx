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
  fetchData,
  getCategories
} from "../store/users/actions";
import { fetchLocations, setModule } from "../store/app/actions";
import { showPost, getPosts, getNews } from "../store/post/actions";

import logger from "../modules/logger";

import Loading from "../pages/Loading";

import { WelcomeDesktop, LoginDesktop, HomeDesktop } from "./components/Factory";

import "../style/App.scss";
import { AuthState } from "../models";

const AppDesktop = (props: {
  token: string;
  module: string;
  post: data;
  locations: data;
  cookies: any;
  posts: data;
  auth: AuthState;
  categories: data;
  getCategories: () => void;
  setModule: (previous: string, next: string) => void;
  setToken: (arg0: string) => void;
  checkToken: (arg0: string) => void;
  fetchLocations: (props?: any) => any;
  fetchData: (arg0: string) => void;
  showPost: (arg0: showPostPayload) => void;
  getPosts: (arg0: string) => void;
  getNews: (arg0: string) => void;
}) => {
  const { token, cookies, auth } = props;
  const userMuni = auth.user.type==='muni'

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchPostsNews = () => {
    logger({ text: "fetching", emph: "categories", type: "positive" });
    // setMessage("fetching categories...");
    // console.log(!Object(props.categories));
    // if (!Object(props.categories).keys) props.getCategories();
    // logger({ text: "fetching", emph: "petitions", type: "positive" });
    // setMessage("fetching petitions...");
    // props.getPosts(auth.user.location);
    // logger({ text: "fetching", emph: "news", type: "positive" });
    // setMessage("fetching news...");
    // props.getNews(auth.user.location);
  };

  const toggleModule = (module: string) => {
    props.setModule(props.module, module);
  };

  useEffect(() => {
    logger({ text: "main process is", emph: "launched", type: "positive" });

    if (token === "clear") {
      logger({ text: "token is", emph: "clear", type: "attention" });
      cookies.set("token", "");
      toggleModule("welcome");
    }

    if (auth.user._id && auth.user.location && token) {
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
      if (!Object(props.locations).keys) props.fetchLocations();
    }
  }, [auth, token]);

  useEffect(() => {
    console.log("2. triggered module");
    // if (props.module != "post" && props.post.show) {
    //   console.log("- module is not post, clear it");
    //   props.showPost({ show: false });
    // }
    if (props.module === "home") {
      console.log("- module is home");
      setLoading(false);
    }
  }, [props.module]);

  useEffect(() => {
    console.log("6. triggered posts");
    if (
      // props.posts.length > 0 &&
      // props.module !== "post" &&
      token !== "clear" &&
      auth.user._id.length > 0 &&
      props.module !== "home"
    ) {
      console.log("- posts are there, show post");
      toggleModule("home");
      setLoading(false);
    }
  }, [props.auth]);

  // useEffect(() => {
  //   console.log("4. triggered post");
  //   if (props.post.show && props.module !== "post") {
  //     console.log("- post is there, show post");
  //     toggleModule("post");
  //   }
  // }, [props.post]);

  const handleNewButtonClick = () => {
    toggleModule("new");
  };

  const config = { action: handleNewButtonClick, user: userMuni };

  let show = <Loading message={message} />;

  switch (props.module) {
    case "welcome":
      show = <WelcomeDesktop config={config} />;
      break;
    case "login":
      show = <LoginDesktop config={config} />;
      break;
    case "home":
      show = <HomeDesktop config={config} />;
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
    auth: state.auth,
    categories: state.categories
  };
};

export default connect(
  mapStateToProps,
  {
    setModule,
    setToken,
    checkToken,
    fetchLocations,
    fetchData,
    showPost,
    getPosts,
    getNews,
    getCategories
  }
)(withCookies(AppDesktop));
