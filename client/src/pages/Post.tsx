import React from "react";

import PostUser from "../features/Post/";
import News from "../features/Post/News";

import Page from "../layout/Page";

const Post = (props: { news?: boolean }) => (
  <Page>{props.news ? <News /> : <PostUser />}</Page>
);

export default Post;
