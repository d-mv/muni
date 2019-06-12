import React from "react";

import Paragraph from '../../../layout/Paragraph'

const Solution = (props: { text: string ,direction:string}) => {
  return <Paragraph direction={props.direction}>{props.text}</Paragraph>;
};

export default Solution;
