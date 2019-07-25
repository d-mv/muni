import React from "react";
import { iconCreateNew } from "../../../icons";
import { add } from "../../../icons/add";

import { Button } from "../../../styles/NewButton";

const NewButton = (props: { config: { action: () => void; user: any } }) => (
  <Button onClick={() => props.config.action()}>
    {props.config.user ? add("white") : iconCreateNew}
  </Button>
);

export default NewButton;
