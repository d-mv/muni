import React from "react";

import { down } from "../icons/Icons";

import style from "./styles/Dropdown.module.scss";

const Dropdown = (props: {
  list: Array<any>;
  action: (arg0: React.FormEvent<Element>) => void;
}) => {
  return (
    <section
      className={style.section}
      onChange={(event: React.FormEvent<Element>) => props.action(event)}>
      <label>LOCATION</label>
      <select>
        {props.list.map((location: { [index: string]: string }) => {
          return (
            <option key={location.value} value={location.value}>
              {location.label}
            </option>
          );
        })}
      </select>
      <span>{down}</span>
    </section>
  );
};

export default Dropdown;
