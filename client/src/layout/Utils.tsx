import React from "react";

const spacerFactory = (size: number, units: string) => {
  const style = {
    height: `${size}${units}`,
    width: `${size}${units}`
  };
  return <span style={style} />;
};

export const Spacer = (props: { size: number; units: string }) =>
  spacerFactory(props.size, props.units);
