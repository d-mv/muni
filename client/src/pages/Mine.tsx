import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { data, post } from "../store/types";

import Header from "../components/Header";
import PostList from "../components/PostList";

import Page from "../layout/Page";
import SubTitle from "../layout/SubTitle";
import Content from "../layout/Content";
import { AuthState } from "../store/models";

const Mine = (props: {
  language: data;
  auth: AuthState;
  allPosts: post[];
  locations: data;
}) => {
  const { direction, text } = props.language;
  const { allPosts, auth, locations } = props;
  const {user} = auth
  const location = locations.filter((el: any) => el._id === user.location)[0];

  const posts = allPosts.filter((post: post) => post.createdBy === user._id);
  const headerObject = {
    name: location
  };
// console.log(posts)
  return (
    <Page data-testid='page__mine'>
      <Header {...headerObject} />
      <Content padded>
        <SubTitle title={text["mine.subtitle"]} direction={direction} />
        <PostList posts={posts} />
      </Content>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    locations: state.locations,
   auth:state.auth,
    allPosts: state.posts
  };
};

export default connect(
  mapStateToProps,
  {}
)(Mine);
