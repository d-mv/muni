import React from "react";

import styleFactory from "../modules/style_factory";

import style from "./styles/Message.module.scss";

/**
 * React JSX component to wrap message
 *
 * @param {object} props - Children to display, mode/color
 *
 * @returns {JSX.Element}
 *
 */
const Message = (props: { children: any; direction: string; mode: string;use?:string }) => {
  const styles: any = style;
  const use = props.use ? props.use[0].toUpperCase() + props.use.slice(1) : ''
  const messageStyle = styles[styleFactory(`message${use}`, props.direction)];
  const messageMode = styles[props.mode];
  return (
    <div className={messageStyle}>
      <span className={messageMode}>{props.children}</span>
    </div>
  );
};

export default Message;
