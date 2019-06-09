import React from "react";

import style from "./styles/Paragraph.module.scss";

/**
 * React JSX component to wrap block with paragraph style
 *
 * @param {object} props - Children to display, boolean label - thin
 *
 * @returns {JSX.Element}
 */
const Block = (props: { children: any; thin?: boolean }): JSX.Element => {
  const paragraphStyle = props.thin ? style.paraThin : style.paragraph;
  return <div className={paragraphStyle}>{props.children}</div>;
};

export default Block;
