import React from "react";

import styles from "./style/SubTitle.module.scss";

const SubTitle = (props: { title: string; direction: string }) => {
  return (
    <h2 className={props.direction === "rtl" ? styles.titleR : styles.title}>
      {props.title}
    </h2>
  );
};

export default SubTitle;
