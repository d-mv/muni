import React from "react";

import style from "../styles/Paragraph.module.scss";

const Paragraph = (props: { children: any; thin?: boolean }) => {
  const paragraphStyle = props.thin ? style.paraThin : style.paragraph
  return <p className={paragraphStyle}>{props.children}</p>;
};

export default Paragraph;
