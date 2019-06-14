import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { data, indexedObjAny, post } from "../store/types";
import { showHelp } from "../store/app/actions";

import Help from "../features/Help";

import Header from "../components/Header";
import ShowPost from "../components/ShowPost";
import PostList from "../components/PostList";

import Page from "../layout/Page";
import SubTitle from "../layout/SubTitle";


const makePostsArray = (posts: Array<post>, id: string) => {
  let result: Array<post> = [];
  posts.map((post: post) => {
    if (post.createdBy === id) result.push(post);
  });
  return result;
};

const Mine = (props: {
  language: data;
  locationData: indexedObjAny;
  login: data;
  help: boolean;
  showHelp: (arg0: boolean) => void;
}) => {
  const { direction, text } = props.language;
  const { _id } = props.login.payload;
  const { posts, pinned } = props.locationData;
  const [postsLcl, setPosts] = useState(
    posts ? makePostsArray(posts, _id) : []
  );
  const [post, setPost] = useState({ _id: "" });

  useEffect(() => {
    if (posts) {
      setPosts(makePostsArray(posts, _id));
    }
  }, [props.locationData, posts]);

  const handleSetPost = (newPost: any) => {
    if (post !== newPost) {
      setPost(newPost);
    }
  };

  const handleClearPost = () => {
    setPost({ _id: "" });
  };

  const toggleHelp = () => {
    props.showHelp(!props.help);
  };

  const header = <Header help={toggleHelp} returnTo='mine' />;

  const subtitle = (
    <SubTitle title={text["mine.subtitle"]} direction={direction} />
  );

  let content = <PostList posts={postsLcl} action={handleSetPost} />;

  if (post["_id"]) {
    content = <ShowPost post={post} />;
  }

  return (
    <Page>
      {header}

      {subtitle}
      {content}
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    locationData: state.locationData,
    help: state.help,
    login: state.login
  };
};

export default connect(
  mapStateToProps,
  { showHelp }
)(Mine);
