import React from "react";

import style from "./styles/Link.module.scss";

const Link = (props: { text: string }) => {
  return <div className={style.link}>{props.text}</div>;
};

export default Link;
