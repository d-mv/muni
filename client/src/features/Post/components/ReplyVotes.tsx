import React from "react";

import styles from "./style/ReplyVotes.module.scss";
import Thumb from "../../../icons/Thumb";

export const ReplyVotes = (props: { replies: { up: string[]; down: string[] } }) => (
  <div className={styles.container}>
    <p>{props.replies.up.length.toLocaleString()}</p>
    <Thumb frame='secondary' fill='secondary' />
    <p>{props.replies.down.length.toLocaleString()}</p>
    <Thumb frame='attention' fill='attention' />
  </div>
);
