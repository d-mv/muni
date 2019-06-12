import React from "react";

import styles from "./style/Page.module.scss";

/**
 * React JSX component to wrap page
 *
 * @param {object} props - Children to display, boolean labels - opposite and welcome
 *
 * @returns {JSX.Element}
 *
 */
const Page = (props: {
  children: any;
  opposite?: boolean;
  welcome?: boolean;
}): JSX.Element => {
  let pageStyle = props.opposite
    ? styles.pageOpposite
    : props.welcome
    ? styles.welcome
    : styles.pageWithContent;
  return <main className={pageStyle}>{props.children}</main>;
};

export default Page;
