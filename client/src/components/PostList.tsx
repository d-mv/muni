import React from "react";

import Card from "../features/Card";
import CardMuni from '../features/Card/CardMuni'
import { post } from "../store/types";

const PostList = (props: { posts: any; muni?: boolean }) =>
  props.posts.map((post: any) =>
    props.muni ? (
      <CardMuni key={post._id} post={post} />
    ) : (
      <Card key={post._id} post={post} />
    )
  );

export default PostList;
