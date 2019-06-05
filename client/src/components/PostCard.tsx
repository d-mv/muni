import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { post, indexedObjAny } from "../store/types";

import Voters from "./Post/Voters";
import CardVoteButton from "./Post/VoteButton";
import Photo from "./Post/Photo";
import Category from "./Post/Category";
import Title from "./Post/Title";
import Age from "./Post/Age";

import style from "../styles/PostCard.module.scss";

const PostCard = (props: { post: post; language: indexedObjAny }) => {
console.log(props.post)


  const { text } = props.language;
  const { direction } = props.language;

  // const votesMissing = props.post.votes ? true : false
  // let voterText;
  // if (props.post.votes){
    const voterText =
      props.post.votes === 1 ? text["post.voter"] : text["post.voters"];
  // }

  return (
    <article className={direction === "rtl" ? style.cardRight : style.card}>
      <Photo photo={props.post.photo} />
      <section className={style.information}>
        <Category category={props.post.category} />
        <Title title={props.post.title} />
        <section id='age' className={style.data}>
          <Age
            date={props.post.date}
            text={[text["post.age.day"], text["post.age.days"]]}
            direction={direction}
          />
          {/* {props.post.votes ? */}
          <Voters
            number={props.post.votes}
            text={voterText}
            direction={direction}
          />
          {/* : null} */}
          <span className={style.button}>
            <CardVoteButton />
          </span>
        </section>
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
  {}
)(PostCard);
