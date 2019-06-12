import React from 'react'

import styleFactory from '../modules/style_factory'

import styles from "./style/Label.module.scss";

const Label = (props:{direction: string, value: string}) => {
  const hStyle = styles[styleFactory("label", props.direction)];
  return <h3 className={hStyle}>{props.value}</h3>;
}

export default Label