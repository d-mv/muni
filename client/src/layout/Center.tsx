import React from "react";

import style from "./styles/Center.module.scss";

/**
 * React JSX component to center content of the line
 *
 * @param {object} props - Children to display, boolean to show as block
 *
 * @returns {JSX.Element}
 *
 */
const Line = (props: { children: any; block?: boolean }) => {
  const styles: any = style;
  const centerStyle = styles[`center${props.block ? "Block" : ""}`];
  return <div className={centerStyle}>{props.children}</div>;
};

export default Line;
