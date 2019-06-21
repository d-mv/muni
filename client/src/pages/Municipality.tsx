import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { post } from "../store/types";

import Header from "../components/Header";

import Page from "../layout/Page";
import PostList from "../components/PostList";
import Content from "../layout/Content";

const Municipality = (props: { posts: post[] }) => {
  const { posts } = props;

  return (
    <Page>
      {/* <Header />; */}
      <Content padded>
        <PostList posts={posts} />;
      </Content>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    posts: state.locationData.municipality
  };
};

export default connect(
  mapStateToProps,
  {}
)(Municipality);
