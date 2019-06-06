import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { post, indexedObjAny } from "../store/types";

import Card from "../layout/Card";
import Voters from "./Post/Voters";
import CardVoteButton from "./Post/VoteButton";
import Photo from "./Post/Photo";
import Category from "./Post/Category";
import Title from "./Post/Title";
import Age from "./Post/Age";

import style from "../styles/PostCard.module.scss";

const PostCard = (props: { post: post; language: indexedObjAny }) => {
  const { text } = props.language;
  const { direction } = props.language;

  const voterText =
    props.post.votes === 1 ? text["post.voter"] : text["post.voters"];

  return (
    <Card id={props.post._id} direction={direction}>
      <Photo photo={props.post.photo} />
      <section
        className={
          direction === "rtl" ? style.informationRTL : style.information
        }>
        <Category category={props.post.category} />
        <Title title={props.post.title} direction={direction} />
        <section
          id='age'
          className={direction === "rtl" ? style.dataRTL : style.data}>
          <Age
            date={props.post.date}
            text={[text["post.age.day"], text["post.age.days"]]}
            direction={direction}
          />
          <Voters
            number={props.post.votes}
            text={voterText}
            direction={direction}
          />
          <span className={style.button}>
            <CardVoteButton />
          </span>
        </section>
      </section>
    </Card>
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
