import React from "react";

// import styles from "./style/Content.module.scss";

/**
 * React JSX component to wrap content
 *
 * @param {object} props - Children to display
 *
 * @returns {JSX.Element}
 *
 */
const Content = (props: {
  children: any;
  padded?: boolean;
}) => {
  let style = "content";
  if (props.padded) style = "content-padded";

  return <div className={style}>{props.children}</div>;
};

export default Content;
