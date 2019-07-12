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

const CardMuni = (props: {
  muni?: boolean;
  post: data;
  language: indexedObjAny;
  showPost: (arg0: showPostPayload) => void;
}) => {
  const { text, direction } = props.language;
  const { _id, title, date, photo,createdAt } = props.post;

  const handleClick = () => {
    props.showPost({ show: true, type: "news", _id: _id });
  };
  const ageText: { [index: string]: string } = text["post.age"];

  return (
    <Card id={_id} direction={direction} action={handleClick}>
      <Photo photo={photo}>
        <div>''</div>
      </Photo>
      <section
        className={
          direction === "rtl" ? style.informationRTL : style.information
        }>
        <Title news title={title} direction={direction} />
        <section
          id='age'
          className={direction === "rtl" ? style.dataRTL : style.data}>
          <Age date={createdAt} text={ageText} direction={direction} />
        </section>
      </section>
    </Card>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
  };
};

export default connect(
  mapStateToProps,
  {showPost}
)(CardMuni);
