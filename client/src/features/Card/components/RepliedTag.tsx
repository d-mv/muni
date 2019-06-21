import React from "react";

import style from "./style/RepliedTag.module.scss";
import styleFactory from "../../../modules/style_factory";

const RepliedTag = (props: { text: string; direction: string }) => {
  return (
    <div className={style[styleFactory("tag", props.direction)]}>
      <p>{props.text}</p>
    </div>
  );
};

export {RepliedTag}