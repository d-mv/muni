import React from "react";

import style from "./style/Loading.module.scss";
import { VectorLogo } from "../icons/Welcome";

const Loading = () => (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <VectorLogo />
      </div>
      <div className={style.loader}>
        <div className={style.outer} />
        <div className={style.middle} />
        <div className={style.inner} />
      </div>
    </div>
);

export default Loading;
