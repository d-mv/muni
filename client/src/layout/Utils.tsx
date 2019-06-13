import React from "react";

import { colorsArray } from "../style/_colors";

const styleZero = {
  display: "none"
};

const styleSeparator = {
  borderLeft: `.05rem solid ${colorsArray.grey}`,
  borderRight: `.05rem solid ${colorsArray.grey}`,
  height: "1rem",
  width: ".3rem",
  marginRight: ".7rem",
  marginLeft: '.7rem'
};

const spacerFactory = (size: number, units: string) => {
  const style = {
    height: `${size}${units}`,
    width: `${size}${units}`
  };
  return <span style={style} />;
};

export const Spacer = (props: { size: number; units: string }) =>
  spacerFactory(props.size, props.units);

export const Zero = () => <span style={styleZero} />;

export const Separator = () => <span style={styleSeparator} />;
