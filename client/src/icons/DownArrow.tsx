import React from 'react'

import { colorsArray } from "../styles/_colors";

export const DownArrow = (props: { color: string }) => {
  return (
    <svg
      viewBox='0 0 367 253'
      xmlns='http://www.w3.org/2000/svg'
      fillRule='evenodd'
      clipRule='evenodd'
      strokeLinejoin='round'
      strokeMiterlimit='1.414'>
      <path
        d='M142.082,194.676C139.778,193.716 137.954,192.252 136.61,190.284C135.266,188.316 134.594,186.084 134.594,183.588L134.594,178.692C134.594,176.196 135.266,173.964 136.61,171.996C137.954,170.028 139.778,168.564 142.082,167.604L203.714,142.836C205.538,142.068 207.266,142.26 208.898,143.412C210.53,144.564 211.346,146.1 211.346,148.02L211.346,148.452C211.346,150.948 210.65,153.204 209.258,155.22C207.866,157.236 206.018,158.676 203.714,159.54L146.258,180.996C146.162,180.996 146.114,181.044 146.114,181.14C146.114,181.236 146.162,181.284 146.258,181.284L203.714,202.74C206.018,203.604 207.866,205.044 209.258,207.06C210.65,209.076 211.346,211.332 211.346,213.828L211.346,214.26C211.346,216.18 210.53,217.716 208.898,218.868C207.266,220.02 205.538,220.212 203.714,219.444L142.082,194.676Z'
        fill={colorsArray[props.color]}
        fillRule='nonzero'
        transform='matrix(0 -1.85282 4.72905 0 -673.298 502.308)'
      />
      <path
        d='M142.082,194.676C139.778,193.716 137.954,192.252 136.61,190.284C135.266,188.316 134.594,186.084 134.594,183.588L134.594,178.692C134.594,176.196 135.266,173.964 136.61,171.996C137.954,170.028 139.778,168.564 142.082,167.604L203.714,142.836C205.538,142.068 207.266,142.26 208.898,143.412C210.53,144.564 211.346,146.1 211.346,148.02L211.346,148.452C211.346,150.948 210.65,153.204 209.258,155.22C207.866,157.236 206.018,158.676 203.714,159.54L146.258,180.996C146.162,180.996 146.114,181.044 146.114,181.14C146.114,181.236 146.162,181.284 146.258,181.284L203.714,202.74C206.018,203.604 207.866,205.044 209.258,207.06C210.65,209.076 211.346,211.332 211.346,213.828L211.346,214.26C211.346,216.18 210.53,217.716 208.898,218.868C207.266,220.02 205.538,220.212 203.714,219.444L142.082,194.676Z'
        fill={colorsArray[props.color]}
        fillRule='nonzero'
        transform='matrix(0 -1.85282 4.72905 0 -673.298 391.586)'
      />
    </svg>
  );
};
