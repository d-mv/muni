import React from "react";

import { colorsArray } from "../styles/_colors";

export const add = (color: string) => (
  <svg
    width='90%'
    height='90%'
    viewBox='0 0 374 368'
    fillRule='evenodd'
    clipRule='evenodd'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeMiterlimit='1.5'>
    <path
      d='M2197.47,1360.05L2197.47,1777.88'
      fill='none'
      stroke={colorsArray[color]}
      strokeWidth='56.78'
      transform='matrix(.77485 0 0 .77485 -1516.18 -1031.84)'
    />
    <path
      d='M1985.12,1568.97L2409.82,1568.97'
      fill='none'
      stroke={colorsArray[color]}
      strokeWidth='56.78'
      transform='matrix(.77485 0 0 .77485 -1516.18 -1031.84)'
    />
  </svg>
);
