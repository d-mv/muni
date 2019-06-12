import React from "react";

import styles from "./style/Block.module.scss";

/**
 * React JSX component to wrap block with paragraph style
 *
 * @param {object} props - Children to display, boolean label - thin
 *
 * @returns {JSX.Element}
 */
const Block = (props: {
  children: any;
  border?: boolean;
  rectangle?: boolean;
}): JSX.Element => {
  let blockStyle = styles.block;

  if (props.border) {
    blockStyle = styles.border;
  } else if (props.rectangle) {
    blockStyle = styles.borderRectangle;
  }

  return <div className={blockStyle}>{props.children}</div>;
};

export default Block;
