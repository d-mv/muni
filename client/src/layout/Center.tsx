import React from "react";

import styles from "./style/Center.module.scss";

/**
 * React JSX component to center content of the line
 * @param {object} props - Children to display, boolean to show as block
 * @returns {JSX.Element}
 */
const Center = (props: { children: any; block?: boolean }) => {

  const centerStyle = styles[`center${props.block ? "Block" : ""}`];
  return <div className={centerStyle}>{props.children}</div>;
};

export default Center;
