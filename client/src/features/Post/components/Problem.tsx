import React from "react";

import Paragraph from "../../../layout/Paragraph";

const Problem = (props: { text: string; direction: string }) => {
  return <Paragraph direction={props.direction}>{props.text}</Paragraph>;
};

export default Problem;
