import React from "react";

const FormButton = (props: { children: any; action: () => void }) => {
  return <button>{props.children}</button>;
};

export default FormButton;
