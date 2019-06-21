import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import PostUser from '../features/Post/'
import PostMuni from '../features/Post/PostMuni'

import Page from "../layout/Page";

/** Functional component to render Post page
 * @returns {JSX.Element} - Post page
 */
const Post = (props: {muni?:true}) => {
  // TODO: change
  const component = props.muni? <PostMuni /> : <PostUser />

  return (
    <Page>
      {component}
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  {}
)(Post);
