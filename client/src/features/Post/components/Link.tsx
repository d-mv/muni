import React from "react";

import style from "./style/Link.module.scss";
import { IconLink } from "../../../icons";
import Line from "../../../layout/Line";
import Block from "../../../layout/Block";

const Link = (props: {
  text: string;
  direction:string
  primary?: boolean;
  secondary?: boolean;
}) => {
  let icon;
  if (props.primary) {
    icon = <IconLink primary />;
  } else if (props.secondary) {
    icon = <IconLink secondary />;
  }

  return (
    // <Line flat direction={props.direction}>
    // <Block>
      <div className={style.link}>
        {icon}
        <p>{props.text}</p>
      </div>
    // </Block>
    // </Line>
  );
};

export default Link;
