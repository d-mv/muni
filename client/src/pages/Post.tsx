import React from "react";


import Page from "../layout/Page";
import { data } from "../store/types";
import Content from "../layout/Content";
import Header from "../components/Header";
import { connect } from "react-redux";

import { AppState } from "../store";

import PostUser from '../features/Post/'

/** Functional component to render Post page
 * @returns {JSX.Element} - Post page
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
