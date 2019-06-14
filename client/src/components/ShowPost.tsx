import React from "react";

import Post from "../features/Post";
import PostMuni from "../features/Post/PostMuni";

import Content from "../layout/Content";

const ShowPost = (props: { post: any; muni?: boolean; edit?: boolean }) => {
  console.log(props.edit)
  const content = props.muni ? (
    <PostMuni post={props.post} edit={props.edit} />
  ) : (
    <Post post={props.post} edit={props.edit} />
  );

  const show = <Content padded>{content}</Content>

  return show;
};

export default ShowPost;
