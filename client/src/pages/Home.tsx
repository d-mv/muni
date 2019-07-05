import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import PinnedCard from "../components/Card/PinnedCard";

import Header from "../components/Header";
import PostList from "../components/PostList";

import Page from "../layout/Page";
import Content from "../layout/Content";
import { data, post } from "../store/types";
import { userInfo } from "os";

const Home = (props: {
  posts: post[];
  pinned: any;
  locations: data;
  user: data;
}) => {
  const { posts, pinned, locations, user } = props;
  const location = locations.filter((el: any) => el._id === user.location)[0];

  const headerObject = {
    name: location.name[user.settings.language],
    right: { icon: <div />, action: () => {} }
  };
  // TODO: move to back
  const sortPostList = (posts: post[]) => {
    return posts.sort((a: post, b: post) =>
      a.votes.length < b.votes.length ? 1 : -1
    );
  };
console.log(pinned)
  return (
    <Page>
      <Header {...headerObject} />
      <Content header>
        {pinned !== {} ? <PinnedCard post={pinned} /> : null}
        <PostList posts={sortPostList(posts)} />;
      </Content>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    locations: state.locations,
    user: state.auth.user,
    posts: state.posts,
    pinned: state.news.filter((el: any) => el.active && el.pinned)[0]
  };
};

export default connect(
  mapStateToProps,
  {}
)(Home);
