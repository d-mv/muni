import React from "react";

import Paragraph from "../../../layout/Paragraph";

export const ParagraphBlock = (props: { text: string; direction: string }) => (
  <Paragraph direction={props.direction}>{props.text}</Paragraph>
);
