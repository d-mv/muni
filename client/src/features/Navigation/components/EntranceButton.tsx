import React from "react";

import style from "./styles/EntranceButton.module.scss";

const EntranceButton = (props: { action: (arg0: string) => void }) => {
  return (
    <div
      className={style.enter}
      data-testid='welcome__button_entrance'
      onClick={() => props.action("login")}>
      <span>ENTRANCE</span>
      <span>כניסה</span>
      <span>دخول</span>
    </div>
  );
};

export default EntranceButton;
