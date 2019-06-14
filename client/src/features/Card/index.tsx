import React from "react";
import { connect } from "react-redux";

import shortText from "../../modules/short_text";
import {
  getCategories,
  categoryIdToName
} from "../../modules/category_processor";

import { AppState } from "../../store";
import { post, indexedObjAny, data, postMuni } from "../../store/types";

import Voters from "./components/Voters";
import VoteButton from "../../components/VoteButton";
import Photo from "./components/Photo";
import Category from "./components/Category";
import Title from "./components/Title";
import Age from "./components/Age";

import Block from "../../layout/Block";
import Card from "../../layout/Card";
import { Zero } from "../../layout/Utils";

import style from "./styles/PostCard.module.scss";

const PostCard = (props: {
  muni?: boolean;
  post: post;
  language: indexedObjAny;
  locationData: data;
  action: (arg0: post | postMuni) => void;
}) => {
  const { text, direction, short } = props.language;
  const { _id, title, date, photo, category } = props.post;
  const votes = props.post.votes ? props.post.votes : [];

  const handleClick = () => {
    props.action(props.post);
  };

  let voterText = "";
  let categoryElement: React.ClassicElement<any> = <Zero />;
  let voterElement: React.ClassicElement<any> = <Zero />;
  let voteButtonElement: React.ClassicElement<any> = <Zero />;

  if (!props.muni) {
    const { categories } = props.locationData;
    const categoryTranslated = categoryIdToName(
      categories,
      short,
      category || ""
    );
    categoryElement = <Category category={categoryTranslated} />;
    voterText = votes.length === 1 ? text["post.voter"] : text["post.voters"];
    voterElement = (
      <Voters number={votes.length} text={voterText} direction={direction} />
    );
    voteButtonElement = (
      <span className={style.button}>
        <VoteButton />
      </span>
    );
  }
  return (
    <Card id={_id} direction={direction} action={handleClick}>
      <Photo photo={photo} />
      <section
        className={
          direction === "rtl" ? style.informationRTL : style.information
        }>
        {categoryElement}
        <Title title={shortText(title, 50)} direction={direction} />
        <section
          id='age'
          className={direction === "rtl" ? style.dataRTL : style.data}>
          <Age
            date={date}
            text={[text["post.age.day"], text["post.age.days"]]}
            direction={direction}
          />
          {voterElement}
          {voteButtonElement}
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
