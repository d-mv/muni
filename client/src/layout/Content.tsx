import React from "react";

import style from "./styles/Content.module.scss";

/**
 * React JSX component to wrap content
 *
 * @param {object} props - Children to display
 *
 * @returns {JSX.Element}
 *
 */
const Content = (props: { children: any; padded?: boolean }) => {
  return (
    <div className={props.padded ? style.padded : style.content}>
      {props.children}
    </div>
  );
};

export default Content;
