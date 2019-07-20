import React from "react";

import Message from "../../../components/Message";

import Content from "../../../layout/Content";

const ContentBlock = (props: {
  stepOne: React.ClassicElement<any> | null;
  stepTwo: React.ClassicElement<any> | null;
  stepThree: React.ClassicElement<any> | null;
  stepFour?: React.ClassicElement<any> | null;
  stepFive?: React.ClassicElement<any> | null;
  preview: React.ClassicElement<any> | null;
  loadingElement: React.ClassicElement<any> | null;
  message: string;

  direction: string;
}) => (
  <Content paddedFlat>
    {props.stepOne}
    {props.stepTwo}
    {props.stepThree}
    {props.stepFour}
    {props.stepFive}
    {props.loadingElement}
  </Content>
);

export default ContentBlock;
