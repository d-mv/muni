import React from "react";

import style from "./style/SetOfThumbs.module.scss";
import Thumb from "../../../icons/Thumb";

export const SetOfThumbs = (props: { fill: string }) => (
  <div className={style.container}>
    <Thumb frame='white' fill={props.fill} />
    <Thumb frame='white' fill={props.fill} />
  </div>
);

