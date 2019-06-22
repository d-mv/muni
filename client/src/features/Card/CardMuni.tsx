import React from "react";
import { connect } from "react-redux";

import shortText from "../../modules/short_text";

import { AppState } from "../../store";
import {showPost} from '../../store/post/actions'
import { post, indexedObjAny, data, postMuni } from "../../store/types";

import Age from "./components/Age";
import Photo from "./components/Photo";
import Title from "./components/Title";

import Card from "../../layout/Card";

import style from "./styles/PostCard.module.scss";
import { showPostPayload } from "../../store/post/types";

const PostCard = (props: {
  muni?: boolean;
  post: postMuni;
  language: indexedObjAny;
  locationData: data;
  showPost: (arg0: showPostPayload) => void;
}) => {
  const { text, direction } = props.language;
  const { _id, title, date, photo } = props.post;

  const handleClick = () => {
    props.showPost({ show: true, type: "muni", _id: _id });
  };

  return (
    <Card id={_id} direction={direction} action={handleClick}>
      <Photo photo={photo}>
        <div>''</div>
      </Photo>
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
  {showPost}
)(PostCard);
