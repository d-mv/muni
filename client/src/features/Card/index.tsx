import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { post, indexedObjAny } from "../../store/types";

import shortText from "../../modules/short_text";

import Card from "../../layout/Card";
import Voters from "./components/Voters";
import VoteButton from "./components/VoteButton";
import Photo from "./components/Photo";
import Category from "./components/Category";
import Title from "./components/Title";
import Age from "./components/Age";

import style from "./styles/PostCard.module.scss";

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
        <Title title={shortText(props.post.title,50)} direction={direction} />
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
            <VoteButton />
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
