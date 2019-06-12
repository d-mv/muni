import React from "react";

import styleFactory from '../modules/style_factory'

import styles from "./style/ButtonsWrapper.module.scss";

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
  const orientation = props.column ? "ver" : "hor";
  const wrapStyle = styles[styleFactory(orientation, props.direction)];
  return <section className={wrapStyle}>{props.children}</section>;
};

export default ButtonsWrapper;
