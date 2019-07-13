import React from "react";

import styles from "./style/Title.module.scss";
import styleFactory from "../../../modules/style_factory";

const Title = (props: { title: string; direction: string; news?: boolean }) => (
  <h2
    id='title'
    className={styles[styleFactory(
      props.news ? "titleNews" : "title",
      props.direction
    )]}>
    {props.title}
  </h2>
);

export default Title;
