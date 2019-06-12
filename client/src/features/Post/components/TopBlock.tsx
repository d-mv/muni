import React from "react";
import Block from "../../../layout/Block";
import Category from "../../Card/components/Category";

const TopBlock = (props: {
  category: string;
  title: string;
  numbersLine: React.ClassicElement<any>;
}) => {
  return (
    <Block>
      <Category category={props.category} />
      <h3>{props.title}</h3>
      {props.numbersLine}
    </Block>
  );
};

export default TopBlock;
