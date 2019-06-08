import React from "react";

import { iconCreateNew } from "../icons/Icons";

import style from "../styles/NewButton.module.scss";

const NewButton = (props: { action: () => void }) => {
  return (
    <button className={style.new} onClick={() => props.action()}>
      {iconCreateNew}
    </button>
  );
};

export default NewButton;
