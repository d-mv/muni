import React from "react";

import Label from "../styles/form/Label";
import { down } from "../icons";
import styleFactory from "../modules/style_factory";
import Field from "../styles/form/Field";
import Area from "../styles/form/Area";
import { Select } from "../styles/form/Select";
import InLine from "../styles/utils/InLine";
import DownIcon from "../styles/form/DownIcon";

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
  direction: string;
  focus?: boolean;
  autoComplete?: string;
}) => {
  const input =
    props.type === "textarea" ? (
      <Area
        direction={props.direction}
        autoFocus={props.focus}
        name={props.name}
        value={props.value}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          props.action(event)
        }
        placeholder={props.value ? "" : props.placeholder}
        minLength={props.length ? props.length : 0}
        rows={7}
        required
      />
    ) : (
      <Field
        direction={props.direction}
        autoFocus={props.focus}
        type={props.type}
        name={props.name}
        value={props.value}
        autoComplete={props.autoComplete ? props.autoComplete : props.name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.action(event)
        }
        placeholder={props.value ? "" : props.placeholder}
        minLength={props.length ? props.length : 0}
        required
      />
      // <input
      //   autoFocus={props.focus}
      //   type={props.type}
      //   name={props.name}
      //   value={props.value}
      //   autoComplete={props.autoComplete ? props.autoComplete : props.name}
      //   onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
      //     props.action(event)
      //   }
      //   placeholder={props.value ? "" : props.placeholder}
      //   minLength={props.length ? props.length : 0}
      //   required
      // />
    );
  return (
    <section className='section'>
      <Label direction={props.direction}>{props.label}</Label>
      {input}
    </section>
  );
};

export const formSelection = (props: {
  list: { value: string; label: string }[];
  direction: string;
  value?: string | number;
  label: string;
  action: (arg0: React.FormEvent<Element>) => void;
  focus?: boolean;
  register?: boolean;
}) => (
  <section
    className={styleFactory("section", props.direction)}
    onChange={(event: React.FormEvent<Element>) => props.action(event)}>
      <Label direction={props.direction}>{props.label}</Label>
    <select
      autoFocus={props.focus}
      style={{ backgroundColor: "white", zIndex: "auto" }}>
      {props.list.map((location: { value: string; label: string }) => {
        return (
          <option
            selected={props.value === location.value}
            key={Math.random() * 100}
            value={location.value}>
            {location.label}
          </option>
        );
      })}
    </select>
    <DownIcon direction={props.direction}>{down}</DownIcon>
  </section>
);
