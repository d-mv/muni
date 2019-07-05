import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import PostUser from "../features/Post/";
import News from "../features/Post/News";

import Page from "../layout/Page";

/** Functional component to render Post page
 * @returns {JSX.Element} - Post page
 */
const Post = (props: { news?: boolean }) => {
  // TODO: change
  const component = props.news ? <News /> : <PostUser />;
// console.log(props.muni)
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
