import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import PinnedCard from "../components/Card/PinnedCard";

import Header from "../components/Header";
import PostList from "../components/PostList";

import { Page } from "../styles/Page";
import Content from "../layout/Content";
import { data, post } from "../store/types";
import Message from "../styles/Message";
import Spacer from "../styles/utils/Spacer";

const Home = (props: {
  posts: post[];
  pinned: any;
  locations: data;
  user: data;
  message: string;
}) => {
  const { posts, pinned, locations, user } = props;
  const location = locations.filter((el: any) => el._id === user.location)[0];

  const headerObject = {
    name: location.name[user.settings.language],
    right: { icon: <div />, action: () => {} }
  };

  const message = props.message ? <Message>{props.message}</Message> : null;

  return (
    <Page>
      <Header {...headerObject} />
      <Content header>
        <Spacer space={4} />
        {pinned ? <PinnedCard post={pinned} /> : null}
        <PostList posts={posts} />
        {message}
        <Spacer space={2} />
      </Content>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    locations: state.locations,
    user: state.auth.user,
    posts: state.posts,
    pinned: state.news.filter((el: any) => el.active && el.pinned)[0],
    module: state.module,
    message: state.message
  };
};

export default connect(
  mapStateToProps,
  {}
)(Home);
