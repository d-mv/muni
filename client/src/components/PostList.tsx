import React from "react";

import Card from "../features/Card";
import { post } from "../store/types";

const PostList = (props: { posts: any }) =>
  props.posts.map((post: any) => <Card key={post._id} post={post} />);

export default PostList;
