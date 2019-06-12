import React from "react";

import style from "./style/Photo.module.scss";

const Photo = (props: { src: string; preview?: boolean }) => {
  
  return <img src={props.src} className={style.photo} />;
};

export default Photo;
