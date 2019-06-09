import React from "react";

import Label from '../layout/Label'
import style from "./formSection.module.scss";

const formSection = (
  label: string,
  type: string,
  name: string,
  value: string,
  placeholder: string,
  action: (arg0: React.ChangeEvent<HTMLInputElement>) => void,
  length?: number,
  direction?:string
) => (
  <section className={style.section}>
      <Label direction={direction || 'ltr'} value={label}/>
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
