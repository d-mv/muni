import React from "react";
import Switch from "react-switch";
import { primary,attention } from "../styles/_colors";

const SwitchComponent = (props: { value: boolean; onChange: () => void }) => (
  <Switch onChange={props.onChange} checked={props.value} checkedIcon={false} uncheckedIcon={false} offColor={attention} onColor={primary}/>
);

export default SwitchComponent;
