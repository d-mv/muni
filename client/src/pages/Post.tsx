import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import PostUser from "../features/Post/";
import PostMuni from "../features/Post/PostMuni";

import Page from "../layout/Page";

/** Functional component to render Post page
 * @returns {JSX.Element} - Post page
 */
const Post = (props: { muni?: boolean }) => {
  // TODO: change
  const component = props.muni ? <PostMuni /> : <PostUser />;
console.log(props.muni)
  return <Page>{component}</Page>;
};

const mapStateToProps = (state: AppState) => {
  return {
    // @ts-ignore
    muni: state.post.type === "muni"
  };
};

export default connect(
  mapStateToProps,
  {}
)(Post);
