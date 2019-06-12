import React from "react";

import styleFactory from "../modules/style_factory";

import style from "./styles/Paragraph.module.scss";

/**
 * React JSX component to wrap paragraph
 *
 * @param {object} props - Children to display, boolean label - thin
 *
 * @returns {JSX.Element}
 */
const Paragraph = (props: {
  children: any;
  direction?: string;
  thin?: boolean;
  flat?: boolean;
}): JSX.Element => {
  const styles: any = style;

  let propsStyle: string = "paragraph";

  if (props.thin) {
    propsStyle = "paraThin";
  } else if (props.flat) {
    propsStyle = "flat";
  }
  let paragraphStyle: string = "";
  if (props.direction) {
    paragraphStyle = styles[styleFactory(propsStyle, props.direction)];
  } else {
    paragraphStyle = styles[propsStyle];
  }

  return <p className={paragraphStyle}>{props.children}</p>;
};

export default Paragraph;
