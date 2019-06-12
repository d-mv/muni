import React from "react";

import styleFactory from "../modules/style_factory";

import styles from "./style/Line.module.scss";

/**
 * React JSX component to wrap line
 *
 * @param {object} props - Children to display, direction, boolean label - thin
 *
 * @returns {JSX.Element}
 *
 */
const Line = (props: {
  children: any;
  direction: string;
  thin?: boolean;
  flat?: boolean;
}) => {
  let lineStyle: string = styles[styleFactory("line", props.direction)];

  if (props.thin) {
    lineStyle = styles[styleFactory("thin", props.direction)];
  } else if (props.flat) {
    lineStyle = styles[styleFactory("flat", props.direction)];
  }
  return <div className={lineStyle}>{props.children}</div>;
};

export default Line;
