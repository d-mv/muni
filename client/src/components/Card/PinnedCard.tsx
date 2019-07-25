import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { indexedObjAny } from "../../store/types";
import { showPost } from "../../store/post/actions";

import dateBeautify from "../../modules/date_beautify";
import shortText from "../../modules/short_text";
import styleFactory from "../../modules/style_factory";

import Card from "../../styles/Card";
import IconMunicipality from "../../icons/Municipality";

import style from "./style/PinnedCard.module.scss";
import { showPostPayload } from "../../store/post/types";
import { NewsType } from "../../models";
import Title from "../../styles/common/Title";
import PlainText from "../../styles/post/PlainText";
import TextLine from "../../styles/post/TextLine";
import Section from "../../styles/Section";

const PinnedCard = (props: {
  post: NewsType;
  language: indexedObjAny;
  showPost: (arg0: showPostPayload) => void;
  type: any;
}) => {
  const handleClick = () => {
    props.showPost({ show: true, type: "news", ...props.post });
  };

  const { direction } = props.language;
  const iconStyle = styleFactory("icon", direction);
  return (
    <Card onClick={() => handleClick()}>
      <div className={style[iconStyle]}>
        <IconMunicipality
          filled
          color={props.type === "muni" ? "secondary" : "primary"}
        />
      </div>
      <Section direction={direction}>
        <Title direction={direction}>{shortText(props.post.title, 55)}</Title>
        <TextLine direction={direction}>
          {dateBeautify(props.post.createdAt, direction)}
        </TextLine>
        <PlainText direction={direction}>
          {shortText(props.post.text, 95)}
        </PlainText>
      </Section>
    </Card>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    type: state.auth.user.type
  };
};

export default connect(
  mapStateToProps,
  { showPost }
)(PinnedCard);
