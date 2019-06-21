import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import PinnedCard from "../features/Card/PinnedCard";

import Header from "../components/Header";
import PostList from "../components/PostList";

import Page from "../layout/Page";
import Content from "../layout/Content";

// const contentFactory = (props: {
//   header: React.ClassicElement<any>;
//   pinnedCard: React.ClassicElement<any> | null;
//   main: React.ClassicElement<any>;
// }) => (
//   <Page>
//     {props.header}{" "}
//     <Content padded>
//       {props.pinnedCard}
//       {props.main}
//     </Content>
//   </Page>
// );

const Home = (props: { posts: any; pinned: any }) => {
  const { posts, pinned } = props;

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

  return (
    <Page>
      <Header />;
      <Content padded>
        {pinned !== {} ? <PinnedCard post={pinned} /> : null}
        <PostList posts={posts} />;
      </Content>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    posts: state.posts,
    pinned: state.locationData
  };
};

export default connect(
  mapStateToProps,
  {}
)(Home);
