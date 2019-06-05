import React from 'react'

import Button from './Button'

import style from '../styles/TopPlank.module.scss'

const TopPlank = () => {
  const mockFN = () =>{}
  return (
    <div className={style.plank}>
      <Button action={mockFN}>?</Button>
      <h1>Page title</h1>
      <Button>edit</Button>
    </div>
  );
}

export default TopPlank