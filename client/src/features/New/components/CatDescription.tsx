import React from "react";
import { data } from "../../../store/types";
import Line from "../../../layout/Line";

const getCategoryDescription = (_id: string, categories: data) => {
  let result = "";
  categories.map((cat: data) => {
    if (cat._id === _id) result = cat.description;
  });

  return result;
};

const CatDescription = (props: {
  direction: string;
  category: string;
  categories: data;
}) => {
  return (
    <Line direction={props.direction}>
      <p className='textStandard'>
        {getCategoryDescription(props.category, props.categories)}
      </p>
    </Line>
  );
};

export default CatDescription;
