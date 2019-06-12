import React from "react";
import Block from "../../../layout/Block";
import Message from "../../../components/Message";

const ContentBlock = (props: {
  stepOne: React.ClassicElement<any> | null;
  stepTwo: React.ClassicElement<any> | null;
  stepThree: React.ClassicElement<any> | null;
  stepFour: React.ClassicElement<any> | null;
  stepFive: React.ClassicElement<any> | null;
  preview: React.ClassicElement<any> | null;
  loadingElement: React.ClassicElement<any> | null;
  message: string;

  direction: string;
}) => {
  return (
    <Block>
      {props.stepOne}
      {props.stepTwo}
      {props.stepThree}
      {props.stepFour}
      {props.stepFive}
      {props.preview}
      <Message direction={props.direction} mode='attention' use='form'>
        {props.message}
      </Message>
      {props.loadingElement}
    </Block>
  );
};

export default ContentBlock;
