import React from "react";

import Content from "./Content";
import PostCard from "../features/Card/PostCard";

const PostList = (props: { posts: any }) => {
  return (
    <Content>
      {props.posts.map((post: any) => (
        <PostCard key={post._id} post={post} />
      ))}
    </Content>
  );
};

export default PostList;
