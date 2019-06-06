import React from "react";

import style from "../styles/Paragraph.module.scss";

/**
 * React JSX component to wrap paragraph
 *
 * @param {object} props - Children to display, boolean label - thin
 *
 * @returns {JSX.Element}
 */
const Paragraph = (props: { children: any; thin?: boolean }): JSX.Element => {
  const paragraphStyle = props.thin ? style.paraThin : style.paragraph;

  return <p className={paragraphStyle}>{props.children}</p>;
};

export default Paragraph;
