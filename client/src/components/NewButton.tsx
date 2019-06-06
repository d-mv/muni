import React from 'react'

import {iconCreateNew} from '../icons/Icons'

import style from '../styles/NewButton.module.scss'

const NewButton = () => {
  return (
    <button className={style.new}>{iconCreateNew}</button>
  );

}

export default NewButton;