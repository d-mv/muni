import React from "react";
import CardVoteButton from "./Post/CardVoteButton";
import { connect } from "react-redux";

import { AppState } from "../store";
import { post, indexedObjAny } from "../store/types";

import Voters from "./Post/Voters";
import postDays from "../modules/post_days";
import style from "../styles/PostCard.module.scss";

const PostCard = (props: { post: post; language: indexedObjAny }) => {
  const { text } = props.language;
  // const { direction } = props.language;
  const direction = 'rtl'

  const age = postDays(props.post.date);

  const voterText =
    props.post.votes.up === 1 ? text["post.voter"] : text["post.voters"];

  const image = {
    background:
      `url(${props.post.photo}) no-repeat scroll center center / cover`
  };

  return (
    <article className={style.card}>
      <div
        style={image}
        className={style.photo}
      />
      <section className={direction === 'rtl' ? style.informationRight: style.information}>
        <div id='category' className={style.category}>
          {props.post.category}
        </div>
        <h2 id='title' className={direction === "rtl" ? style.titleRight:style.title}>
          {props.post.title}
        </h2>
        <div
          id='age'
          className={
            direction === "rtl" ? style.thirdLineRight : style.thirdLine
          }>
          <p>
            {age.toLocaleString()}
            <span className={style.ageText}>
              {age === 1 ? text["post.age.day"] : text["post.age.days"]}
            </span>
          </p>
          <Voters
            number={props.post.votes.up}
            text={voterText}
            direction={direction}
          />
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
  {}
)(PostCard);
