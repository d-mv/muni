import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { indexedObjAny } from "../store/types";

import dateBeautify from "../modules/date_beautify";
import shortText from "../modules/short_text";
import styleFactory from "../modules/style_factory";

import Card from "../layout/Card";
import Line from "../layout/Line";
import Paragraph from "../layout/Paragraph";
import IconMunicipality from "../icons/Municipality";

import style from "../styles/PinnedCard.module.scss";

const PinnedCard = (props: { post: any; language: indexedObjAny }) => {
  const { direction } = props.language;
  const iconStyle = styleFactory("icon", direction);
  return (
    <Card direction={direction} id={props.post._id} margin={25}>
      <div className={style[iconStyle]}>
        <IconMunicipality filled color='primary' />
      </div>
      <Line thin direction={direction}>
        <h2 className={style.title}>{props.post.title.toUpperCase()}</h2>
      </Line>
      <Line thin direction={direction}>
        <p className={style.date}>{dateBeautify(props.post.date, direction)}</p>
      </Line>
      <Paragraph thin>
        <span className={style.text}>{shortText(props.post.text, 100)}</span>
      </Paragraph>
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
)(PinnedCard);
