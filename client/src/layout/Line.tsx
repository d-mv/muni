import React from "react";

import style from "../styles/Line.module.scss";

const Line = (props: { children: any; direction: string, thin?: boolean }) => {
  const styles: any = style;
  const lineStyle = styles[`line${props.direction === "rtl"? "RTL":''}${props.thin?"thin":''}`]
  return <div className={lineStyle}>{props.children}</div>;
};

export default Line;
