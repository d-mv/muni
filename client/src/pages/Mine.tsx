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
  let result = posts.filter((post: post) => post.createdBy === id);
  return result;
};

const Mine = (props: { language: data; _id: string; allPosts: post[] }) => {
  const { direction, text } = props.language;
  const { allPosts, _id } = props;

  const posts = allPosts.filter((post: post) => post.createdBy === _id);
  console.log(posts);
  return (
    <Page data-testid='page__mine'>
      {/* <Header />; */}
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
