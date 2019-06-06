import React from "react";

import style from "../styles/Section.module.scss";

const Section = (props: { children: any }) => {
  return <section className={style.section}>{props.children}</section>;
};

export default Section;
