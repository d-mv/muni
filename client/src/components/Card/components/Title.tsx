import React from "react";

import style from "./styles/Title.module.scss";

const Title = (props: { title: string, direction:string}) => (
  <h2 id='title' className={props.direction==='rtl'?style.titleRTL:style.title}>
    {props.title}
  </h2>
);

export default Title;
