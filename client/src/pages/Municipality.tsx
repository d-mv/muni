import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { data } from "../store/types";

import Header from "../components/Header";

import { Page } from "../styles/Page";
import PostList from "../components/PostList";
import Content from "../layout/Content";
import Spacer from "../styles/utils/Spacer";

const Municipality = (props: {
  news: data;
  locations: data;
  language: data;
  auth: data;
}) => {
  const { news, locations, auth } = props;
  const location = locations.filter(
    (el: any) => el._id === auth.user.location
  )[0];

  const headerObject = {
    name: location.name[auth.user.settings.language],
    right: { icon: <div />, action: () => {} }
  };
  return (
    <Page>
      <Header {...headerObject} />;
      <Spacer space={5} />
      <PostList muni posts={news} />;
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
