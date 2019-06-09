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
const Content = (props: { children: any }) => {
  const compo: JSX.Element = (
    <div className={style.content}>{props.children}</div>
  );
  return compo;
};

export default Content;
