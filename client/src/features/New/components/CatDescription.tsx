import React from "react";
import { data } from "../../../store/types";
import Line from "../../../layout/Line";
import InLine from "../../../styles/utils/InLine";
import PlainText from "../../../styles/post/PlainText";

const getCategoryDescription = (_id: string, categories: data) => {
  let result = "";
  categories.map((cat: data) => {
    if (cat.value === _id) result = cat.desc;
  });
  return result;
};

const CatDescription = (props: {
  direction: string;
  category: string;
  categories: data;
}) => (
  <InLine direction={props.direction} justify='flex-start'>
    <PlainText direction={props.direction}>
      {getCategoryDescription(props.category, props.categories)}
    </PlainText>
  </InLine>
);

export default CatDescription;
