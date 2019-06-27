import React from "react";

import NewPost from "../features/New";
import NewPostMuni from "../features/New/indexMuni";

import Page from "../layout/Page";

const New = (props: { muni?: boolean }) => {
  return <Page opposite>{props.muni ? <NewPostMuni /> : <NewPost />}</Page>;
};

export default New;
