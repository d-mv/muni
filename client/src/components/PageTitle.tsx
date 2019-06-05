import React from "react";

import style from "../styles/PageTitle.module.scss";

const PageTitle = (props:{title: string,direction:string}) => {
  return (
    <h1 className={props.direction === "rtl" ? style.titleR : style.title}>
      {props.title}
    </h1>
  );
};

export default PageTitle;
