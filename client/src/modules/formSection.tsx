import React from "react";

import style from "./formSection.module.scss";

const formSection = (
  label: string,
  type: string,
  name: string,
  value: string,
  placeholder: string,
  action: (arg0: React.ChangeEvent<HTMLInputElement>) => void,
  length?: number
) => (
  <section className={style.section}>
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => action(event)}
      placeholder={value ? "" : placeholder}
      minLength={length ? length : 0}
      required
    />
  </section>
);

export default formSection;
