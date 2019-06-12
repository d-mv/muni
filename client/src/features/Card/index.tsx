import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { post, indexedObjAny, data } from "../../store/types";

import shortText from "../../modules/short_text";
import {
  getCategories,
  categoryIdToName
} from "../../modules/category_processor";
import Block from "../../layout/Block";
import Card from "../../layout/Card";
import Voters from "./components/Voters";
import VoteButton from "./components/VoteButton";
import Photo from "./components/Photo";
import Category from "./components/Category";
import Title from "./components/Title";
import Age from "./components/Age";

import style from "./styles/PostCard.module.scss";

const PostCard = (props: {
  post: post;
  language: indexedObjAny;
  locationData: data;
}) => {
  const { text, direction, short } = props.language;
  const { categories } = props.locationData;

const { _id, title, date,photo, votes } = props.post;


  const category = categoryIdToName(categories, short, props.post.category);

  const voterText = votes.length === 1 ? text["post.voter"] : text["post.voters"];

  return (
    <Card id={_id} direction={direction}>
      <Photo photo={photo} />
      <section
        className={
          direction === "rtl" ? style.informationRTL : style.information
        }>
        <Category category={category} />
        <Title title={shortText(title, 50)} direction={direction} />
        <section
          id='age'
          className={direction === "rtl" ? style.dataRTL : style.data}>
          <Age
            date={date}
            text={[text["post.age.day"], text["post.age.days"]]}
            direction={direction}
          />
          <Voters
            number={votes.length}
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
    language: state.language,
    locationData: state.locationData
  };
};

export default connect(
  mapStateToProps,
  {}
)(PostCard);
