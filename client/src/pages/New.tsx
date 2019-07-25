import React from "react";

import NewPost from "../features/New";
import NewPostMuni from "../features/New/indexMuni";

import {PageOpposite} from "../styles/Page";

const New = (props: { muni?: boolean }) => {
  return <PageOpposite>{props.muni ? <NewPostMuni /> : <NewPost />}</PageOpposite>;
};

export default New;
