import React from "react";
import { post, postMuni } from "../store/types";
import Block from "../layout/Block";
import Post from "../features/Post";
import PostMuni from "../features/Post/PostMuni";

const ShowPost = (props: { muni?: boolean; post: any }) => {
  
  const content = props.muni ? (
    <PostMuni post={props.post} />
  ) : (
    <Post post={props.post} />
  );

  return <Block>{content}</Block>;
};

export default ShowPost;
