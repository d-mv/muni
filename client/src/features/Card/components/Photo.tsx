import React from "react";

import { imageDecoder } from "../../../modules/image_coder";

import style from "./style/Photo.module.scss";
import styleFactory from "../../../modules/style_factory";

const Photo = (props: {
  photo: string;
  children?: JSX.Element | null;
  direction?: string;
}) => {
  let image = require("../../../assets/image__default.png");

  if (props.photo)
    image = {
      background: `url(${props.photo}) no-repeat scroll center center / cover`
    };

  const photoStyle = props.direction
    ? style[styleFactory("photo", props.direction)]
    : style.photo;

  return (
    <div style={image} className={photoStyle}>
      {props.children}
    </div>
  );
};

export default Photo;
