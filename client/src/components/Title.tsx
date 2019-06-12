import React from "react";

import style from "./styles/Title.module.scss";

const Title = (props: { title: string, direction: string, return: () => void }) => {
  return (
    <h1 className={props.direction === "rtl" ? style.titleR : style.title} onClick={()=>props.return()}>
      {props.title}
    </h1>
  );
};

export default Title;
