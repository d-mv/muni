import React from "react";

import { colorsArray } from "../styles/_colors";

export const iconClose = (color: string) => (
  <svg
    width='90%'
    height='90%'
    viewBox='0 0 300 300'
    fillRule='evenodd'
    clipRule='evenodd'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeMiterlimit='1.5'>
    <path
      d='M234.195,84.195C316.982,84.195 384.195,151.408 384.195,234.195C384.195,316.982 316.982,384.195 234.195,384.195C151.408,384.195 84.195,316.982 84.195,234.195C84.195,151.408 151.408,84.195 234.195,84.195ZM234.195,100.615C307.92,100.615 367.775,160.47 367.775,234.195C367.775,307.92 307.92,367.775 234.195,367.775C160.47,367.775 100.615,307.92 100.615,234.195C100.615,160.47 160.47,100.615 234.195,100.615Z'
      fill={colorsArray[color]}
      transform='matrix(1 0 0 1 -84.188 -84.195)'
    />
    <path
      d='M163.524,304.866L304.866,163.524'
      fill='none'
      stroke={colorsArray[color]}
      strokeWidth='17'
      transform='matrix(1 0 0 1 -84.188 -84.195)'
    />
    <path
      d='M304.866,304.866L163.524,163.524'
      fill='none'
      stroke={colorsArray[color]}
      strokeWidth='17'
      transform='matrix(1 0 0 1 -84.188 -84.195)'
    />
  </svg>
);
