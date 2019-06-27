import React from "react";

import style from "./style/SetOfThumbs.module.scss";
import Thumb from "../../../icons/Thumb";

export const SetOfThumbs = (props: {
  fill: string;
  onClick: (arg0: boolean) => void;
}) => (
  <div className={style.container}>
    <span onClick={() => props.onClick(true)}>
      <Thumb frame='white' fill={props.fill} />
    </span>
    <span onClick={() => props.onClick(false)}>
      <Thumb frame='white' fill={props.fill} />
    </span>
  </div>
);
