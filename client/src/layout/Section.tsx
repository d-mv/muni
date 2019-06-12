import React from "react";

import styles from "./style/Section.module.scss";

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
  narrow?: boolean
}): JSX.Element => {
  let sectionStyle = "";
  if (props.step) {
    sectionStyle = styles.step;
  } else if (props.back) {
    sectionStyle = styles.back;
  } else if (props.wide) {
    sectionStyle = styles.wide;
  }
   else if (props.narrow) {
    sectionStyle = styles.narrow;
  }
  return <section className={sectionStyle}>{props.children}</section>;
};

export default Section;
