import React from "react";

import Label from "../styles/form/Label";
import Field from "../styles/form/Field";
import Area from "../styles/form/Area";
import DownIcon from "../styles/form/DownIcon";
import Select from "../styles/form/Select";
import Option from "../styles/form/Option";
import Section from "../styles/Section";

import { down } from "../icons";

export const formSection = (props: {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  action: (
    arg0: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  attention?: boolean;
  length?: number;
  direction: string;
  focus?: boolean;
  autoComplete?: string;
}) => {
  const input =
    props.type === "textarea" ? (
      <Area
        data-id={props.name}
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
        data-id={props.name}
        attention={props.attention}
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
    );
  return (
    <Section direction={props.direction}>
      <Label id='form__label' direction={props.direction}>
        {props.label}
      </Label>
      {input}
    </Section>
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
  <Section
    id='form__section'
    direction={props.direction}
    onChange={(event: React.FormEvent<Element>) => props.action(event)}>
    <Label direction={props.direction}>{props.label}</Label>
    <Select id="form__select" direction={props.direction} autoFocus={props.focus} width='100%'>
      {props.list.map((location: { value: string; label: string }) => (
        <Option
          id='form__option'
          selected={props.value === location.value}
          key={Math.random() * 100}
          value={location.value}>
          {location.label}
        </Option>
      ))}
    </Select>
    <DownIcon direction={props.direction}>{down}</DownIcon>
  </Section>
);
