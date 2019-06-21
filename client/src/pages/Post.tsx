import React from "react";

import Login from "../features/Login";
import Register from "../features/Register";

import LangSwitch from "../components/LangSwitch";

import Page from "../layout/Page";
import PostComponent from "../features/Post";
import style from "./style/Login.module.scss";
import { data } from "../store/types";
import Content from "../layout/Content";
import Header from "../components/Header";
import { connect } from "react-redux";

import { AppState } from "../store";

import PostUser from '../features/Post/'
import PostMuni from '../features/Post/PostMuni'

/** Functional component to render login/register page
 * @returns {JSX.Element} - Login page
 */
const Post = (props: {post: data }) => {
  // TODO: change
  const component =<PostUser />
  // const component = props.post.type === "user" ? <PostUser /> : <PostMuni />;

  return (
    <Page>
      <Header />
      <Content padded>{component}</Content>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    //@ts-ignore
    post: state.post.type
  };
};

export default connect(
  mapStateToProps,
  {}
)(Post);
