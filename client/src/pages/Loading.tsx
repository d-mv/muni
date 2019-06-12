import React from "react";

import Logo from '../components/Logo'

import style from "./style/Loading.module.scss";

const Loading = () => (
  <div>
    <Logo />
    <div className={style.loader}>
      <div className={style.outer} />
      <div className={style.middle} />
      <div className={style.inner} />
    </div>
  </div>
);

export default Loading;
