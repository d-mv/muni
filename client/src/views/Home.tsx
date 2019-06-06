import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import Page from '../layout/Page'
import Header from '../components/Header'
import PostList from '../components/PostList'

const Home = (props: any) => {
  const [posts, setPosts] = React.useState(
    props.locationData.payload ? props.locationData.payload.posts : []
  );

  React.useEffect(() => {
    if (props.locationData.posts) {
      setPosts(props.locationData.posts);
    }
  }, [props.locationData.payload]);
  return (
    <Page>
      <Header />
      <PostList posts={posts}/>
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
