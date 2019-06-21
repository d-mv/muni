import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { data, post } from "../store/types";

import Header from "../components/Header";
import PostList from "../components/PostList";

import Page from "../layout/Page";
import SubTitle from "../layout/SubTitle";
import Content from "../layout/Content";

const makePostsArray = (posts: Array<post>, id: string) => {
  let result: Array<post> = [];
  posts.map((post: post) => {
    if (post.createdBy === id) result.push(post);
  });
  return result;
};

const Mine = (props: { language: data; _id: string; allPosts: post[] }) => {
  const { direction, text } = props.language;
  const { allPosts, _id } = props;

  const posts = makePostsArray(allPosts, _id);

  return (
    <Page>
      <Header />;
      <Content padded>
        <SubTitle title={text["mine.subtitle"]} direction={direction} />
        <PostList posts={posts} />;
      </Content>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    _id: state.locationData._id,
    allPosts: state.posts
  };
};

export default connect(
  mapStateToProps,
  {}
)(Mine);
