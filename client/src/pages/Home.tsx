import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { data, indexedObjAny } from "../store/types";
import { showHelp } from "../store/app/actions";

import PinnedCard from "../features/Card/PinnedCard";

import Header from "../components/Header";
import ShowPost from "../components/ShowPost";
import PostList from "../components/PostList";

import Page from "../layout/Page";

const contentFactory = (props: {
  header: React.ClassicElement<any>;
  pinnedCard: React.ClassicElement<any> | null;
  main: React.ClassicElement<any>;
}) => (
  <Page>
    {props.header}
    {props.pinnedCard}
    {props.main}
  </Page>
);

const Home = (props: {
  language: data;
  locationData: indexedObjAny;
  help: boolean;
  showHelp: (arg0: boolean) => void;
}) => {
  const { posts, pinned } = props.locationData;
  const [postsLcl, setPosts] = useState(posts ? posts : []);
  const [pinnedLcl, setPinned] = useState(pinned ? pinned : {});
  const [post, setPost] = useState({ _id: "", createdBy: "" });

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
    setPost({ _id: "", createdBy: "" });
  };

  const toggleHelp = () => {
    props.showHelp(!props.help);
  };

  const handleAction = (actions: {
    mode: string,
    details:string
  }) => {
console.log(actions);
  }

  let header = <Header help={toggleHelp} returnTo='home'/>;
  let pinnedCard = null;
  let main = <PostList posts={postsLcl} action={handleSetPost} />;

  if (post["_id"] !== "") {
    const author = post.createdBy === props.locationData._id;
    header = author ? (
      <Header help={toggleHelp} returnTo='home' edit action={handleAction} />
    ) : (
      <Header
        help={toggleHelp}
        returnTo='home'
        complain
        action={handleAction}
      />
    );
    main = <ShowPost post={post} />;
    pinnedCard = null;
  } else if (pinnedLcl !== {}) {
    pinnedCard = <PinnedCard post={pinnedLcl} action={handleSetPost} />;
  }

  return contentFactory({ header, pinnedCard, main });
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
