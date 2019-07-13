import React from "react";
import { data } from "../../../store/types";
import Line from "../../../layout/Line";

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
  <Line direction={props.direction}>
    <p className='textStandard'>
      {getCategoryDescription(props.category, props.categories)}
    </p>
  </Line>
);

export default CatDescription;
