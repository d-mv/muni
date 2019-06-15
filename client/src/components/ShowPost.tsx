import React from "react";

import Post from "../features/Post";
import PostMuni from "../features/Post/PostMuni";

import Content from "../layout/Content";

const ShowPost = (props: { post: any; muni?: boolean; edit?: boolean }) => {
  console.log(props.edit)
  const mockFn = (props:any) => { }
  const content = props.muni ? (
    <PostMuni post={props.post} edit={props.edit} />
  ) : (
      <Post post={props.post} edit={props.edit} action={mockFn}/>
  );

  const show = {content}

  return content;
};

export default ShowPost;
