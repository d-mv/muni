import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";

import Content from "../../layout/Content";
import { data, postMuni } from "../../store/types";
import PostList from "../../layout/PostList";
import ShowPost from "../../components/ShowPost";

const MuniPage = (props: { language: data; locationData: data }) => {
  const { municipality } = props.locationData;
  const [post, setPost] = React.useState({ _id: "" });

  const handleSetPost = (newPost: any) => {
    if (post !== newPost) {
      setPost(newPost);
    }
  };

  const handleClearPost = () => {
    setPost({ _id: "" });
  };

  let content = post["_id"] ? (
    // @ts-ignore
    <ShowPost post={post} />
  ) : (
    <PostList muni posts={municipality} action={handleSetPost} />
  );

  return content;
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
)(MuniPage);
