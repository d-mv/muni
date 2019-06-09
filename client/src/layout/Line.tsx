import React from "react";

import style from "./styles/Line.module.scss";

/**
 * React JSX component to wrap line
 *
 * @param {object} props - Children to display, direction, boolean label - thin
 *
 * @returns {JSX.Element}
 *
 */
const Line = (props: { children: any; direction: string; thin?: boolean }) => {
  const styles: any = style;
  const lineStyle =
    styles[
      `line${props.direction === "rtl" ? "RTL" : ""}${props.thin ? "thin" : ""}`
    ];
  return <div className={lineStyle}>{props.children}</div>;
};

export default Line;
