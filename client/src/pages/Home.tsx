import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import Page from '../layout/Page'
import Header from '../components/Header'
import PinnedCard from '../features/Card/PinnedCard'
import PostList from '../layout/PostList'

const Home = (props: any) => {
  const [posts, setPosts] = React.useState(
    props.locationData.posts ? props.locationData.posts : []
  );
  const [pinned, setPinned] = React.useState(
    props.locationData.pinned ? props.locationData.pinned : {}
  );

  React.useEffect(() => {
    if (props.locationData.posts) {
      setPosts(props.locationData.posts);
    }
  }, [props.locationData.payload]);
  return (
    <Page>
      <Header />
      <PinnedCard post={pinned} />
      <PostList posts={posts} />
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
