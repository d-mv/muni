import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { indexedObjAny, postMuni } from "../../store/types";
import { showPost } from "../../store/post/actions";

import dateBeautify from "../../modules/date_beautify";
import shortText from "../../modules/short_text";
import styleFactory from "../../modules/style_factory";

import Block from "../../layout/Block";
import Card from "../../layout/Card";
import Line from "../../layout/Line";
import Paragraph from "../../layout/Paragraph";
import IconMunicipality from "../../icons/Municipality";

import style from "./styles/PinnedCard.module.scss";
import { showPostPayload } from "../../store/post/types";

const PinnedCard = (props: {
  post: postMuni;
  language: indexedObjAny;
  showPost: (arg0: showPostPayload) => void;
  type: any;
}) => {
  const handleClick = () => {
    props.showPost({ show: true, type: "muni", _id: props.post._id });
  };

  const { direction } = props.language;
  const iconStyle = styleFactory("icon", direction);
  return (
    <Card
      direction={direction}
      id={props.post._id}
      margin={25}
      action={handleClick}>
      <div className={style[iconStyle]}>
        <IconMunicipality
          filled
          color={props.type === "muni" ? "secondary" : "primary"}
        />
      </div>
      <Block>
        <Line direction={direction}>
          <span className={style.title}>{shortText(props.post.title, 55)}</span>
        </Line>
        <Line thin direction={direction}>
          <span className={style.date}>
            {dateBeautify(props.post.date, direction)}
          </span>
        </Line>
        <Paragraph direction={direction}>
          {shortText(props.post.text, 95)}
        </Paragraph>
      </Block>
    </Card>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    type: state.type
  };
};

export default connect(
  mapStateToProps,
  { showPost }
)(PinnedCard);
