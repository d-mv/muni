import React from "react";

import styles from "./style/Content.module.scss";

/**
 * React JSX component to wrap content
 *
 * @param {object} props - Children to display
 *
 * @returns {JSX.Element}
 *
 */
const Content = (props: { children: any; padded?: boolean }) => {
  return (
    <div className={props.padded ? styles.padded : styles.content}>
      {props.children}
    </div>
  );
};

export default Content;
