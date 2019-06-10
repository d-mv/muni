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
}): JSX.Element => {
  const styles: any = style;

  let paragraphStyle = props.thin ? style.paraThin : style.paragraph;

  if (props.direction) {
    // console.log(stylestyleFactory(paragraphStyle, props.direction));
    paragraphStyle =
      styles[
        styleFactory(props.thin ? "paraThin" : "paragraph", props.direction)
      ];
    console.log(paragraphStyle);
  }

  return <p className={paragraphStyle}>{props.children}</p>;
};

export default Paragraph;
