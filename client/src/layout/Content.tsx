import React from "react";

/**
 * React JSX component to wrap content
 *
 * @param {object} props - Children to display
 *
 * @returns {JSX.Element}
 *
 */
const Content = (props: {
  children: any;
  padded?: boolean;
  header?: boolean;
}) => {
  let style = "content";
  if (props.padded) style = "content-padded";
  if (props.header) style = "content-header";

  return <div className={style}>{props.children}</div>;
};

export default Content;
