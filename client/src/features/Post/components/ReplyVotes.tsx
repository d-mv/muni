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
             <span>{length(props.replies.up)}</span>
             <Thumb frame='secondary' fill='secondary' />
           </Votes>
           <Votes color={attention}>
             <span>{length(props.replies.down)}</span>
             <Thumb frame='attention' fill='attention' />
           </Votes>
         </InLine>
       );
