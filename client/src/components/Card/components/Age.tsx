import React from "react";

import postDays from "../../../modules/post_days";

import { PostAge, PostAgeText } from "../../../styles/common/PostAge";

const Age = (props: {
  date: string;
  text: { [index: string]: string };
  direction: string;
}) => {
  const ageResponse: { [index: string]: string } = postDays(props.date);
  const ageNumber = ageResponse[Object.keys(ageResponse)[0]];

  let text = props.text[Object.keys(ageResponse)[0]];
  return (
    <PostAge direction={props.direction}>
      {ageNumber.toLocaleString()}
      <PostAgeText>{text}</PostAgeText>
    </PostAge>
  );
};

export default Age;
