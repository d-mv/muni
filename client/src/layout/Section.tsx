import React from "react";

import style from "./styles/Section.module.scss";

/**
 * React JSX component to wrap section
 * @param {object} props - Children to display
 *
 * @returns {JSX.Element}
 */
const Section = (props: { children: any }): JSX.Element => {
  return <section className={style.section}>{props.children}</section>;
};

export default Section;
