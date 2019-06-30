import React, { useEffect, useState } from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import axios from "axios";

import { AppState } from "../store";
import { data, indexedObj } from "../store/types";
import { showPostPayload } from "../store/post/types";

import {
  setToken,
  checkToken,
  fetchData,
  getPosts,
  getMuniPosts
} from "../store/users/actions";
import { fetchLocations, setModule } from "../store/app/actions";
import { showPost } from "../store/post/actions";

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

const App = (props: {
  token: string;
  module: string;
  post: boolean;
  locations: data;
  cookies: any;
  posts: data;
  userMuni: boolean;
  auth: indexedObj;

  setModule: (previous: string, next: string) => void;
  setToken: (arg0: string) => void;
  checkToken: (arg0: string) => void;
  fetchLocations: (props?: any) => any;
  fetchData: (arg0: string) => void;
  showPost: (arg0: showPostPayload) => void;
  getPosts: (arg0: string) => void;
  getMuniPosts: (arg0: string) => void;
}) => {
  const { token, userMuni, cookies, auth, posts } = props;

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchPostsNews = () => {
    console.log("fetching petitions...");
    setMessage("fetching petitions...");
    props.getPosts(auth.location);
    console.log("fetching news...");
    setMessage("fetching news...");
    props.getMuniPosts(auth.location);
  };

  const toggleModule = (module: string) => {
    props.setModule(props.module, module);
  };

  useEffect(() => {
    logger({ text: "main process is", emph: "launched", type: "positive" });

    if (auth._id && auth.location && token) {
      logger({ text: "auth is", emph: "true", type: "positive" });

      if (token === "clear") {
        cookies.set("token", "");
        props.setToken("");
        toggleModule("welcome");
      } else if (cookies.get("token") !== token) {
        logger({ text: "set token in", emph: "cookies" });
        setMessage("saving auth...");
        // set auth settings for axios
        cookies.set("token", token);
      }
      axios.defaults.headers = { token };

      if (posts.length < 1) {
        logger({ text: "posts are", emph: "false", type: "attention" });
        setMessage("fetching data...");
        fetchPostsNews();
      }

    } else {
      logger({ text: "auth is", emph: "false", type: "attention" });
      const cookie = cookies.get("token");

      if (!token && cookie && cookie.length > 0) {
        logger({ text: "cookie is", emph: "true", type: "positive" });
        setMessage("checking cookie...");
        props.checkToken(cookie);
      } else {
        logger({ text: "cookie is", emph: "false", type: "attention" });
        setMessage("fetching locations...");
        props.fetchLocations();
        setLoading(false);
      }
    }
  }, [auth]);

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
    // if (props.module === "welcome") {
    //   console.log("- module is welcome, no token whatsoever");
    //   // setLoading(false);
    // }
  }, [props.module]);

  useEffect(() => {
    console.log("6. triggered posts");
    if (
      props.posts.length > 0 &&
      props.module !== "post" &&
      token !== "clear" &&
      props.module !== "home" &&
      loading
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
      show = <Post config={config} />;
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
    post: state.post.show,
    posts: state.posts,
    userMuni: state.type === "muni",
    auth: state.auth
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
    getMuniPosts
  }
)(withCookies(App));
