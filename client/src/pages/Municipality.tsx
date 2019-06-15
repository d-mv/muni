import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { data, indexedObjAny } from "../store/types";
import { showHelp } from "../store/app/actions";

import Header from "../components/Header";

import Page from "../layout/Page";
import PostList from "../components/PostList";
import ShowPost from "../components/ShowPost";
import Content from "../layout/Content";

const contentFactory = (props: {
  header: React.ClassicElement<any>;
  main: React.ClassicElement<any>;
}) => (
  <Page>
    {props.header}
    <Content padded>{props.main}</Content>
  </Page>
);

const Municipality = (props: {
  language: data;
  locationData: indexedObjAny;
  help: boolean;
  showHelp: (arg0: boolean) => void;
}) => {
  const { municipality } = props.locationData;
  const [postsLcl, setPosts] = useState(municipality ? municipality : []);
  const [post, setPost] = useState({ _id: "" });

  useEffect(() => {
    if (municipality) {
      setPosts(municipality);
    }
  }, [props.locationData, municipality]);

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
  const handleAction = (actions: { mode: string; details: string }) => {
    console.log(actions);
  };

  let header = <Header help={toggleHelp} returnTo='municipality' />;

  let main = <PostList muni posts={municipality} action={handleSetPost} />;

  if (post["_id"] !== "") {
    const user = props.locationData.type === "muni_user";
    header = user ? (
      <Header help={toggleHelp} returnTo='home' edit action={handleAction} />
    ) : (
      <Header
        help={toggleHelp}
        returnTo='home'
        complain
        action={handleAction}
      />
    );
    main = <ShowPost muni post={post} />;
  }

  return contentFactory({ header, main });
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
)(Municipality);
