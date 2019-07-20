import React from "react";

import { Button, Title } from "../styles/VoteButton";

const VoteButton = (props: { title: string }) => (
  <Button>
    <Title>{props.title}</Title>
  </Button>
);

export default VoteButton;
