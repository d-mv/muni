import React from "react";

import { post, postMuni } from "../store/types";

import PostCard from "../features/Card";

import Content from "../layout/Content";

const PostList = (props: {
  posts: any;
  muni?: boolean;
  action: (arg0: post | postMuni) => void;
}) =>
  props.posts.map((post: any) => (
    <PostCard
      key={post._id}
      post={post}
      muni={props.muni}
      action={props.action}
    />
  ));

export default PostList;
