import React from "react";

import Card from "../features/Card";

const PostList = (props: { posts: any }) =>
  props.posts.map((post: any) => <Card key={post._id} post={post} />);

export default PostList;
