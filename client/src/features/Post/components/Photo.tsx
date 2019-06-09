import React from "react";

import style from "./styles/Photo.module.scss";

const Photo = (props: { src: string }) => {
  return <img src={props.src} />;
};

export default Photo;
