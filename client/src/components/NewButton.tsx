import React from 'react'

import {iconCreateNew} from '../icons/Icons'

import style from '../styles/NewButton.module.scss'

const NewButton = () => {
  return (
    // <div >
    <button className={style.new}>{iconCreateNew}</button>
    // </div>
  );

}

export default NewButton;