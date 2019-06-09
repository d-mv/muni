import React from 'react'
import styleFactory from '../modules/style_factory'
import style from './styles/Label.module.scss'

const Label = (props:{direction: string, value: string}) => {
  const styles: any = style
  const hStyle = styles[styleFactory("label", props.direction)];
  return <h3 className={hStyle}>{props.value}</h3>;
}

export default Label