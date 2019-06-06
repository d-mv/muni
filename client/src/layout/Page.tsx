import React from 'react'

import style from "../styles/Page.module.scss";


/**
 * React JSX component to wrap page
 *
 * @param {object} props - Children to display, boolean labels - opposite and welcome
 *
 * @returns {JSX.Element}
 *
 */
const Page = (props: { children: any; opposite?:boolean, welcome?:boolean }):JSX.Element => {
  let pageStyle = props.opposite ? style.pageOpposite : props.welcome ? style.welcome : style.page;
  return <main className={pageStyle}>{props.children}</main>;
};

export default Page;