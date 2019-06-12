import React from "react";

import style from "./styles/Section.module.scss";

/**
 * React JSX component to wrap section
 * @param {object} props - Children to display
 *
 * @returns {JSX.Element}
 */
const Section = (props: {
  children: any;
  step?: boolean;
  back?: boolean;
  wide?: boolean;
}): JSX.Element => {
  let sectionStyle = "";
  if (props.step) {
    sectionStyle = style.step;
  } else if (props.back) {
    sectionStyle = style.back;
  }
  return <section className={sectionStyle}>{props.children}</section>;
};

export default Section;
