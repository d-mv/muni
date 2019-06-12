import React from "react";

import style from "./styles/Link.module.scss";
import { IconLink } from "../../../icons";
import Line from "../../../layout/Line";

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
    <Line flat direction={props.direction}>
      <div className={style.link}>
        {icon}
        {props.text}
      </div>
    </Line>
  );
};

export default Link;
