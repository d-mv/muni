import React from "react";

import style from "../styles/Loading.module.scss";

const Loading = () => (
  <div className={style.loader}>
    <div className={style.outer} />
    <div className={style.middle} />
    <div className={style.inner} />
  </div>
);

export default Loading;
