import React from "react";

import { imageDecoder } from "../../../modules/image_coder";

import style from "./style/Photo.module.scss";
import styleFactory from "../../../modules/style_factory";

const Photo = (props: {
  photo: string;
  children?: JSX.Element | null;
  direction?: string;
}) => {
  const image = {
    background: `url(${props.photo}) no-repeat scroll center center / cover`
  };

  const photoStyle = props.direction ? style[styleFactory("photo", props.direction)] : style.photo
  console.log(photoStyle)
  // const image = {
  //   background: `url(${imageDecoder(
  //     props.photo
  //   )}) no-repeat scroll center center / cover`
  // };

  return (
    <div style={image} className={photoStyle}>
      {props.children}
    </div>
  );
};

export default Photo;
