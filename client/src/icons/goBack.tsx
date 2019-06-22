import React from 'react'

import { colorsArray } from '../style/_colors';

export const goBack = (color: string) => (
  <svg
    width='90%'
    height='90%'
    viewBox='0 0 217 367'
    fillRule='evenodd'
    clipRule='evenodd'
    strokeLinejoin='round'
    strokeMiterlimit='1.41421'>
    <path
      d='M21.169,247.333c-6.513,-4.54 -11.67,-11.463 -15.47,-20.77c-3.799,-9.306 -5.699,-19.862 -5.699,-31.665l0,-23.154c0,-11.804 1.9,-22.359 5.699,-31.666c3.8,-9.306 8.957,-16.23 15.47,-20.77l174.24,-117.129c5.156,-3.632 10.041,-2.724 14.655,2.724c4.614,5.448 6.921,12.712 6.921,21.792l0,2.043c0,11.803 -1.968,22.472 -5.903,32.006c-3.935,9.534 -9.16,16.343 -15.673,20.429l-162.434,101.467c-0.271,0 -0.407,0.227 -0.407,0.681c0,0.454 0.136,0.681 0.407,0.681l162.434,101.466c6.513,4.086 11.738,10.896 15.673,20.43c3.935,9.534 5.903,20.202 5.903,32.006l0,2.043c0,9.08 -2.307,16.344 -6.921,21.792c-4.614,5.448 -9.499,6.355 -14.655,2.724l-174.24,-117.13Z'
      fill={colorsArray[color]}
      fillRule='nonzero'
    />
  </svg>
);