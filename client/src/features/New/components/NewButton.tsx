import React from "react";
import { iconCreateNew } from "../../../icons";
import { add } from "../../../icons/add";

import style from "./styles/NewButton.module.scss";

const NewButton = (props: { config: { action: () => void; user: any } }) => {
  const icon = props.config.user ? add("white") : iconCreateNew;
  return (
    <button className={style.new} onClick={() => props.config.action()}>
      {icon}
    </button>
  );
};

export default NewButton;
