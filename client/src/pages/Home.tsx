import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import PinnedCard from "../features/Card/PinnedCard";

import Header from "../components/Header";
import PostList from "../components/PostList";

import Page from "../layout/Page";
import Content from "../layout/Content";
import { data } from "../store/types";

const Home = (props: {
  posts: any;
  pinned: any;
  language: string;
  location: data;
}) => {
  const { posts, pinned } = props;

  const headerObject = {
    name: props.location.name[props.language],
    right: { icon: <div />, action: () => {} }
  };

  return (
    <Page>
      <Header {...headerObject} />
      <Content header>
        {pinned !== {} ? <PinnedCard post={pinned} /> : null}
        <PostList posts={posts} />;
      </Content>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    location: state.locationData,
    language: state.language.short,
    posts: state.posts,
    pinned: state.locationData
  };
};

export default connect(
  mapStateToProps,
  {}
)(Home);
