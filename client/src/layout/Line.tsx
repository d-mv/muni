import React from "react";

import style from "../styles/Line.module.scss";

const Line = (props: { children: any; direction: string }) => {
  const lineStyle = props.direction === "rtl" ? style.lineRTL : style.line;
  return <div className={lineStyle}>{props.children}</div>;
};

export default Line;
