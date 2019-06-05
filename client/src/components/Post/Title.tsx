import React from "react";

import style from "../../styles/Title.module.scss";

const Title = (props: { title: string }) => (
  <h2 id='title' className={style.title}>
    {props.title}
  </h2>
);

export default Title;
