import React from "react";
import styleFactory from "../../../modules/style_factory";

import { DownArrow } from "../../../icons";
import { indexedObj } from "../../../store/types";

import styles from "./style/ShowMore.module.scss";

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
        <span className={styles.more}>{props.title.more}</span>
        <span className={styles.less}>{props.title.less}</span>
        <DownArrow primary />
      </button>
    </div>
  );
};

export default ShowMore;
