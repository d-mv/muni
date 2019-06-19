import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { data, indexedObjAny } from "../store/types";
import { showHelp } from "../store/app/actions";
import { vote, setPosts } from "../store/users/actions";

import PinnedCard from "../features/Card/PinnedCard";

import Header from "../components/Header";
import ShowPost from "../components/ShowPost";
import PostList from "../components/PostList";

import Page from "../layout/Page";
import Content from "../layout/Content";
import Post from "../features/Post";

const contentFactory = (props: {
  header: React.ClassicElement<any>;
  pinnedCard: React.ClassicElement<any> | null;
  main: React.ClassicElement<any>;
}) => (
  <Page>
    {props.header}{" "}
    <Content padded>
      {props.pinnedCard}
      {props.main}
    </Content>
  </Page>
);

const Home = (props: {
  language: data;
  locationData: indexedObjAny;
  help: boolean;
  posts: any;
  showHelp: (arg0: boolean) => void;
  vote: (_id: string, user: string) => void;
  setPosts: (arg0: any) => void;
}) => {
  const { posts, pinned } = props.locationData;
  // const [postsLcl, setPosts] = useState(posts ? posts : []);
  const [pinnedLcl, setPinned] = useState(pinned ? pinned : {});
  const [post, setPost] = useState({ _id: "", createdBy: "" });
  const [pinnedPost, viewPinnedPost] = useState({ _id: "", createdBy: "" });

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

  const handleViewPinnedPost = (newPost: any) => {
    if (pinnedPost !== newPost) {
      viewPinnedPost(newPost);
    }
  };

  // const handleClearPost = () => {
  //   setPost({ _id: "", createdBy: "" });
  // };

  const toggleHelp = () => {
    props.showHelp(!props.help);
  };

  // const handleUpdatePost = (updateProps: {
  //   _id: string;
  //   action: string;
  //   fields?: any;
  // }) => {
  //   console.log("handle");
  //   switch (updateProps.action) {
  //     case "vote": {
  //       const oldPosts = props.posts;
  //       oldPosts.map((post: any) => {
  //         if (post._id === updateProps._id)
  //           if (!post.votes.includes(props.locationData._id)) {
  //             console.log(post.votes);
  //             post.votes.push(props.locationData._id);
  //           }
  //       });
  //       props.setPosts(oldPosts);
  //       props.vote(updateProps._id, props.locationData._id);
  //     }
  //   }
  // };

  // const handleAction = (actions: { mode: string; details: string }) => {
  //   console.log(actions);
  // };

  let header = <Header help={toggleHelp} returnTo='home' />;
  let pinnedCard = null;
  let main = <PostList posts={props.posts} action={handleSetPost} />;

 if (pinnedLcl !== {}) {
    pinnedCard = <PinnedCard post={pinnedLcl} action={handleViewPinnedPost} />;
  }

  // return contentFactory({ header, pinnedCard, main });
  return (
    <Page>
      <Header help={toggleHelp} returnTo='home' />;
      <Content padded>
        {pinnedCard}
        <PostList posts={props.posts} action={handleSetPost} />;
      </Content>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    locationData: state.locationData,
    help: state.help,
    posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  { showHelp, vote, setPosts }
)(Home);
