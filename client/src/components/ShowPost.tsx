import React from "react";

import { post, postMuni } from "../store/types";

import Post from "../features/Post";
import PostMuni from "../features/Post/PostMuni";

import Block from "../layout/Block";
import Content from "../layout/Content";

const ShowPost = (props: { muni?: boolean; post: any }) => {

  const content = props.muni ? (
    <PostMuni post={props.post} />
  ) : (
    <Post post={props.post} />
  );

  return <Content padded>{content}</Content>;
};

export default ShowPost;
