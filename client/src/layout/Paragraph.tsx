import React from "react";

import style from "../styles/Paragraph.module.scss";

const Paragraph = (props: { children: any }) => {
  return <p className={style.paragraph}>{props.children}</p>;
};

export default Paragraph;
