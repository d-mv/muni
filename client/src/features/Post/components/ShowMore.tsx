import React from "react";
import styleFactory from "../../../modules/style_factory";

import style from "./style/ShowMore.module.scss";

import Line from "../../../layout/Line";
import { DownArrow } from "../../../icons";
import Button from "../../../components/Button";
import { indexedObj } from "../../../store/types";

const styles: any = style;

const ShowMore = (props: {
  title: indexedObj;
  direction: string;
  opened: boolean;
  action: (arg0: boolean) => void;
}) => {
  const styleName = props.opened ? "open" : "closed";
  const showStyle = styles[styleFactory(styleName, props.direction)];

  return (
    <div className={showStyle}>
      <button onClick={() => props.action(!props.opened)}>
        <span className={style.more}>{props.title.more}</span>
        <span className={style.less}>{props.title.less}</span>
        <DownArrow primary />
      </button>
    </div>
  );
};

export default ShowMore;
