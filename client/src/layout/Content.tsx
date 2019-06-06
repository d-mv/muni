import React from "react";

import style from "../styles/Content.module.scss";

const Content = (props: { children: any }) => {
  return <div className={style.content}>{props.children}</div>;
};

export default Content;
