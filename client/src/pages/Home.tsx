import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import Page from "../layout/Page";
import Header from "../components/Header";
import PinnedCard from "../features/Card/PinnedCard";
import PostList from "../layout/PostList";
import Post from "../features/Post";

const Home = (props: any) => {
  const { posts, pinned } = props.locationData;
  const [postsLcl, setPosts] = React.useState(posts ? posts : []);
  const [pinnedLcl, setPinned] = React.useState(pinned ? pinned : {});
  const [post, setPost] = React.useState({ _id: "" });

  React.useEffect(() => {
    if (posts) {
      setPosts(posts);
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

  let header = <Header />;

  let pinnedCard =
    pinnedLcl === {} ? null : (
      <PinnedCard post={pinnedLcl} action={handleSetPost} />
    );
  let content = <PostList posts={postsLcl} action={handleSetPost} />;
  if (post["_id"]) {
    // @ts-ignore
    content = <Post post={post} />;
    pinnedCard = null;
  }

  return (
    <Page>
      {header}
      {pinnedCard}
      {content}
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    locationData: state.locationData
  };
};

export default connect(
  mapStateToProps,
  {}
)(Home);
