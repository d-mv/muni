import React from "react";

import style from "./styles/SubTitle.module.scss";

const SubTitle = (props: { title: string; direction: string }) => {
  return (
    <h2 className={props.direction === "rtl" ? style.titleR : style.title}>
      {props.title}
    </h2>
  );
};

export default SubTitle;
