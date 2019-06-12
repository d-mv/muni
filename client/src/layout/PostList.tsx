import React from "react";

import Content from "./Content";
import PostCard from "../features/Card";
import { post, postMuni } from "../store/types";

const PostList = (props: {
  posts: any;
  muni?: boolean;
  action: (arg0: post | postMuni) => void;
}) => {
  return (
    <Content>
      {props.posts.map((post: any) => (
        <PostCard
          key={post._id}
          post={post}
          muni={props.muni}
          action={props.action}
        />
      ))}
    </Content>
  );
};

export default PostList;
