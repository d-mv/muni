import React from "react";

import style from "./style/Photo.module.scss";
import styleFactory from "../../../modules/style_factory";

const Photo = (props: {
  photo: string;
  children?: JSX.Element | null;
  direction?: string;
}) => {
  let image: any = "";
  if (props.photo) {
    image = props.photo;
  } else {
    image = require("../../../assets/image__default.png");
  }
  const photo = {
    background: `url(${image}) no-repeat scroll center center / cover`
  };

  const photoStyle = props.direction
    ? style[styleFactory("photo", props.direction)]
    : style.photo;

  return (
    <div style={photo} className={photoStyle}>
      {props.children}
    </div>
  );
};

export default Photo;
