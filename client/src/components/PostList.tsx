import React from "react";

import Card from "./Card";
import CardMuni from "./Card/CardMuni";

const PostList = (props: { posts: any; muni?: boolean }) =>
  props.posts.map((post: any) =>
    props.muni ? (
      <CardMuni key={post._id} post={post} />
    ) : (
      <Card key={post._id} post={post} />
    )
  );

export default PostList;
