import React from "react";

import Label from "../layout/Label";
import { indexedObj } from "../store/types";
import { down } from "../icons";
import styleFactory from "../modules/style_factory";
import style from "./formSection.module.scss";

export const formSection = (
  label: string,
  type: string,
  name: string,
  value: string,
  placeholder: string,
  action: (
    arg0: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void,
  length?: number,
  direction?: string
) => {
  const input =
    type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          action(event)
        }
        placeholder={value ? "" : placeholder}
        minLength={length ? length : 0}
        rows={10}
        required
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => action(event)}
        placeholder={value ? "" : placeholder}
        minLength={length ? length : 0}
        required
      />
    );
  return (
    <section className={style.section}>
      <Label direction={direction || "ltr"} value={label} />
      {input}
    </section>
  );
};

export const formSelection = (
  list: Array<indexedObj>,
  direction: string,
  label: string,
  action: (arg0: React.FormEvent<Element>) => void
) => {
  return (
    <section
      className={style[styleFactory("section", direction)]}
      onChange={(event: React.FormEvent<Element>) => action(event)}>
      <Label direction={direction || "ltr"} value={label} />
      <div className={style.inline}>
        <select>
          {list.map((location: { [index: string]: string }) => {
            return (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            );
          })}
        </select>
        {/* <span> */}
        {down}
        {/* </span> */}
      </div>
    </section>
  );
};
