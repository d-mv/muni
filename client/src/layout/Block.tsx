import React from "react";

import style from "./styles/Paragraph.module.scss";

/**
 * React JSX component to wrap block with paragraph style
 *
 * @param {object} props - Children to display, boolean label - thin
 *
 * @returns {JSX.Element}
 */
const Block = (props: {
  children: any;
  thin?: boolean;
  border?: boolean;
  rectangle?: boolean;
}): JSX.Element => {
  let paragraphStyle = style.paragraph;

  if (props.thin && props.border) {
    paragraphStyle = style.borderThin;
  } else if (props.thin) {
    paragraphStyle = style.paraThin;
  } else if (props.border) {
    paragraphStyle = style.border;
  } else if (props.rectangle) {
    paragraphStyle = style.borderRectangle;
  }

  return <div className={paragraphStyle}>{props.children}</div>;
};

export default Block;
