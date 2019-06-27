import React from "react";

import postDays from "../../../modules/post_days";

import style from "./style/Age.module.scss";

const Age = (props: {
  date: string;
  text: { [index: string]: string };
  direction: string;
}) => {
  const ageResponse: { [index: string]: string } = postDays(props.date);
  const ageNumber = ageResponse[Object.keys(ageResponse)[0]];
  let elementStyle = { age: style.age, text: style.text };

  let text = props.text[Object.keys(ageResponse)[0]];
  if (props.direction === "rtl") elementStyle.age = style.ageR;
  return (
    <p className={elementStyle.age}>
      {ageNumber.toLocaleString()}
      <span className={elementStyle.text}>{text}</span>
    </p>
  );
};

export default Age;
