import React from "react";

import postDays from "../../../modules/post_days";

import style from "./style/Age.module.scss";

const Age = (props: {
  date: string;
  text: Array<string>;
  direction: string;
}) => {
  const age = postDays(props.date);
  let elementStyle = { age: style.age, text: style.text };
  if (props.direction === "rtl") elementStyle.age = style.ageR;
  return (
    <p className={elementStyle.age}>
      {age.toLocaleString()}
      <span className={elementStyle.text}>
        {age === 1 ? props.text[0] : props.text[1]}
      </span>
    </p>
  );
};

export default Age;
