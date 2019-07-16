import React, { RefObject } from "react";

import style from "./style/ReplyTag.module.scss";
import { DownArrow, goBack } from "../../../icons";

export const ReplyTag = (props: { text: string }) => (
  <div className={style.tag}>
    <p>{props.text}</p>
    <div className={style.arrow}>{goBack("white")}</div>
  </div>
);
