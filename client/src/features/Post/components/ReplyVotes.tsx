import React from "react";

import styles from "./style/ReplyVotes.module.scss";
import Thumb from "../../../icons/Thumb";

export const ReplyVotes = (props: { replies: { up: string[]; down: string[] } }) => {
  const upLength = props.replies.up ? props.replies.up.length.toLocaleString() : 0
  const downLength = props.replies.down? props.replies.down.length.toLocaleString():0
  return (
    <div className={styles.container}>
      <p>{upLength}</p>
      <Thumb frame='secondary' fill='secondary' />
      <p>{}</p>
      <Thumb frame='attention' fill='attention' />
    </div>
  );
}
