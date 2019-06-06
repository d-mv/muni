import React from 'react'

import style from "../styles/Page.module.scss";

const Page = (props: { children: any; opposite?:boolean, welcome?:boolean }) => {
  let pageStyle = props.opposite ? style.pageOpposite : props.welcome ? style.welcome : style.page;
  return <main className={pageStyle}>{props.children}</main>;
};

export default Page;