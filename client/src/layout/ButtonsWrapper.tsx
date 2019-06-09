import React from "react";

import style from "./styles/ButtonsWrapper.module.scss";

/**
 * Component to wrap buttons and arrange then vertically/horizontally/RTL
 *
 * @param {object} props - Children, direction, column/row arrangement
 *
 * @returns {JSX.Element}
 */
const ButtonsWrapper = (props: {
  children: any;
  direction: string;
  column?: boolean;
  row?: boolean;
}): JSX.Element => {
  const orientation = props.column ? "Ver" : "Hor";
  const wrapStyle =
    style[`wrap${orientation}${props.direction === "rtl" ? "RTL" : ""}`];
  return <section className={wrapStyle}>{props.children}</section>;
};

export default ButtonsWrapper;
