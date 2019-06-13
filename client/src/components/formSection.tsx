import React from "react";

import Label from "../layout/Label";
import { indexedObj, data } from "../store/types";
import { down } from "../icons";
import styleFactory from "../modules/style_factory";

export const formSection = (props: {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  action: (
    arg0: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  length?: number;
  direction?: string;
  focus?: boolean;
}) => {
  const input =
    props.type === "textarea" ? (
      <textarea
        autoFocus={props.focus}
        name={props.name}
        value={props.value}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          props.action(event)
        }
        placeholder={props.value ? "" : props.placeholder}
        minLength={props.length ? props.length : 0}
        rows={10}
        required
      />
    ) : (
      <input
        autoFocus={props.focus}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.action(event)
        }
        placeholder={props.value ? "" : props.placeholder}
        minLength={props.length ? props.length : 0}
        required
      />
    );
  return (
    <section className='section'>
      <Label direction={props.direction || "ltr"} value={props.label} />
      {input}
    </section>
  );
};

export const formSelection = (props: {
  list: Array<indexedObj>;
  direction: string;
  label: string;
  action: (arg0: React.FormEvent<Element>) => void;
  focus?: boolean;
}) => {
  return (
    <section
      className={styleFactory("section", props.direction)}
      onChange={(event: React.FormEvent<Element>) => props.action(event)}>
      <Label direction={props.direction || "ltr"} value={props.label} />
      <div className='inline'>
        <select autoFocus={props.focus}>
          {props.list.map((location: data) => {
            return (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            );
          })}
        </select>
        {down}
      </div>
    </section>
  );
};
