import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { post, data } from "../store/types";

import Header from "../components/Header";

import Page from "../layout/Page";
import PostList from "../components/PostList";
import Content from "../layout/Content";

const Municipality = (props: {
  news: data;
  locations: data;
  language: data;
  auth:data
}) => {
  const { news,locations,auth } = props;
  const location = locations.filter((el: any) => el._id === auth.user.location)[0];

  const headerObject = {
    name: location.name[auth.user.settings.language],
    right: { icon: <div />, action: () => { } }
  };
  return (
    <Page>
      <Header {...headerObject} />;
      <Content header>
        <PostList muni posts={news} />;
      </Content>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    news: state.news,
    language: state.language,
    locations: state.locations,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {}
)(Municipality);
