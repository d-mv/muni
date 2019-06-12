import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { data, indexedObjAny } from "../store/types";
import { showHelp } from "../store/app/actions";

import Help from "../features/Help";
import PinnedCard from "../features/Card/PinnedCard";

import Header from "../components/Header";
import ShowPost from "../components/ShowPost";
import PostList from "../components/PostList";

import Page from "../layout/Page";

const Home = (props: {
  language: data;
  locationData: indexedObjAny;
  help: boolean;
  showHelp: (arg0: boolean) => void;
}) => {
  const { posts, pinned } = props.locationData;
  const [postsLcl, setPosts] = useState(posts ? posts : []);
  const [pinnedLcl, setPinned] = useState(pinned ? pinned : {});
  const [post, setPost] = useState({ _id: "" });

  useEffect(() => {
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

  const toggleHelp = () => {
    props.showHelp(!props.help);
  };

  const header = <Header help={toggleHelp} returnTo='home' />;
  const help = props.help ? (
    <Help
      mode={post["_id"] ? "post" : "home"}
      direction={props.language.direction}
      cancel={toggleHelp}
    />
  ) : null;
  let pinnedCard =
    pinnedLcl === {} ? null : (
      <PinnedCard post={pinnedLcl} action={handleSetPost} />
    );
  let content = <PostList posts={postsLcl} action={handleSetPost} />;
  if (post["_id"]) {
    content = <ShowPost post={post} />;
    pinnedCard = null;
  }

  return (
    <Page>
      {header}
      {help}
      {pinnedCard}
      {content}
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    locationData: state.locationData,
    help: state.help
  };
};

export default connect(
  mapStateToProps,
  { showHelp }
)(Home);
