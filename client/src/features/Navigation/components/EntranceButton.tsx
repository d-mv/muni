import React from "react";

const EntranceButton = (props: { action: (arg0: string) => void }) => {
  return (
    <div
      className='enter'
      data-testid='welcome__button_entrance'
      onClick={() => props.action("login")}>
      <span>ENTER</span>
      <span>כניסה</span>
      <span>دخول</span>
    </div>
  );
};

export default EntranceButton;
