import React from "react";

import styles from "./style/ReplyVotes.module.scss";
import Thumb from "../../../icons/Thumb";
import Votes from "../../../styles/post/Votes";
import InLine from "../../../styles/utils/InLine";
import { secondary, attention } from "../../../styles/_colors";

const length = (votes: any[]) => (votes ? votes.length.toLocaleString() : 0);

export const ReplyVotes = (props: {
         replies: { up: string[]; down: string[] };
         direction: string;
       }) => (
         // <div className={styles.container}>
         <InLine padding='0' direction={props.direction} justify='space-around'>
           <Votes color={secondary}>
             <p>{length(props.replies.up)}</p>
             <Thumb frame='secondary' fill='secondary' />
           </Votes>
           <Votes color={attention}>
             <p>{length(props.replies.down)}</p>
             <Thumb frame='attention' fill='attention' />
           </Votes>
         </InLine>
       );
