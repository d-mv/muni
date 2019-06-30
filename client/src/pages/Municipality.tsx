import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { post, data } from "../store/types";

import Header from "../components/Header";

import Page from "../layout/Page";
import PostList from "../components/PostList";
import Content from "../layout/Content";

const Municipality = (props: {
  posts: post[];
  location: data;
  language: data;
}) => {
  const { posts } = props;

  const headerObject = {
    name: props.location.name[props.language.short]
  };

  return (
    <Page>
      <Content header>
        <Header {...headerObject} />;
        <PostList muni posts={posts} />;
      </Content>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    posts: state.news,
    language: state.language,
    location: state.locationData
  };
};

export default connect(
  mapStateToProps,
  {}
)(Municipality);
