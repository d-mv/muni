import React from "react";
import styleFactory from "../../../modules/style_factory";
import styles from "./style/Voted.module.scss";
const Voted = (props: { text: string; direction: string }) => (
  <div className={styles[styleFactory("voted", props.direction)]}>
    <p>{props.text}</p>
  </div>
);

export { Voted };
