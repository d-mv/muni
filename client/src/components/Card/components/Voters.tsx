import React from "react";

import { votersSecondary } from "../../../icons";

import { PostVoters, PostVotersIcon, PostVotersNumber, PostVotersText } from "../../../styles/common/PostVoters";

const Voters = (props: { number: number; text: string; direction: string }) => {
  return (
    <PostVoters direction={props.direction}>
      <PostVotersIcon>{votersSecondary}</PostVotersIcon>
      <PostVotersNumber>{props.number.toLocaleString()}</PostVotersNumber>
      <PostVotersText>{props.text}</PostVotersText>
    </PostVoters>
  );
};

export default Voters;
