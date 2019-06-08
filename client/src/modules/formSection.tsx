import React from "react";

import form from "../styles/_form.module.scss";

const formSection = (
  label: string,
  type: string,
  name: string,
  value: string,
  placeholder: string,
  action: (arg0?: any) => void,
  length?: number
) => (
  <section className={form.section}>
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={(event: any) => action(event)}
      placeholder={value ? "" : placeholder}
      minLength={length ? length : 0}
      required
    />
  </section>
);

export default formSection;
