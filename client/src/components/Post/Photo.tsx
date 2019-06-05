import React from "react";

import style from "../../styles/Photo.module.scss";

const Photo = (props:{photo: string}) => {
  const image = {
    background: `url(${props.photo}) no-repeat scroll center center / cover`
  };

  return <div style={image} className={style.photo} />;
};

export default Photo;
