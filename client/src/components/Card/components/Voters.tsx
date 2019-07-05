import React from 'react'

import { votersSecondary } from '../../../icons'

import style from './style/Voters.module.scss'

const Voters = (props:{number:number,text:string,direction:string}) => {
  return (
    <p className={props.direction === 'rtl' ? style.votersRight : style.voters}>
      <span className={style.icon}> {votersSecondary}</span>
      <span className={style.number}>{props.number.toLocaleString()} </span>
      <span className={style.text}>{props.text}</span>
    </p>
  );
}

export default Voters