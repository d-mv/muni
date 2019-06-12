import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { post, indexedObjAny, data, postMuni } from "../../store/types";

import shortText from "../../modules/short_text";
import Card from "../../layout/Card";
import Photo from "./components/Photo";
import Title from "./components/Title";
import Age from "./components/Age";

import style from "./styles/PostCard.module.scss";

const PostCard = (props: {
  muni?: boolean;
  post: postMuni;
  language: indexedObjAny;
  locationData: data;
  action: (arg0: post | postMuni) => void;
}) => {
  const { text, direction } = props.language;
  const { _id, title, date, photo } = props.post;

  const handleClick = () => {
    props.action(props.post);
  };

  return (
    <Card id={_id} direction={direction} action={handleClick}>
      <Photo photo={photo} />
      <section
        className={
          direction === "rtl" ? style.informationRTL : style.information
        }>
        <Title title={shortText(title, 50)} direction={direction} />
        <section
          id='age'
          className={direction === "rtl" ? style.dataRTL : style.data}>
          <Age
            date={date}
            text={[text["post.age.day"], text["post.age.days"]]}
            direction={direction}
          />
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
