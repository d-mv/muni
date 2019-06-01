import React from "react";
import CardVoteButton from "./Post/CardVoteButton";
import { connect } from "react-redux";

import { AppState } from "../store";
import postDays from '../modules/post_days'
import { post, indexedObjAny } from "../store/types";
import style from "./Post/Card.module.scss";


const PostCard = (props: { post: post, language: indexedObjAny }) => {
  const {text} = props.language
//   const today:any = new Date()
//   const dbDate:any = new Date(props.post.date)
//   const postDays: number = Math.round((today - dbDate) / 1000 / 60 / 60 / 24)
// const ageElement =
//   postDays === 1
//     ? `${postDays} ${text["post.age.day"]}`
//     : `${postDays} ${text["post.age.days"]}`;

  const age = postDays(
    props.post.date,
    text["post.age.day"],
    text["post.age.days"]
  );

  return (
    <article className={style.card}>
      <img
        src={props.post.photo}
        alt='Photo for the petition'
        className={style.photo}
      />
      <section>
        <div id='category' className={style.category}>
          {props.post.category}
        </div>
        <div id='title' className={style.title}>
          {props.post.title}
        </div>
        <div id='age' className={style.age}>
          {age}
        </div>
        <div id='voters' className={style.voters}>
          {props.post.votes.up}
        </div>
        <CardVoteButton />
      </section>
    </article>
  );
};

const mapStateToProps = (state: AppState) => {
  return {

    language: state.language
  };
};

export default connect(
  mapStateToProps,
  { }
)(PostCard);
