import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { indexedObjAny, postMuni } from "../../store/types";

import dateBeautify from "../../modules/date_beautify";
import shortText from "../../modules/short_text";
import styleFactory from "../../modules/style_factory";

import Block from "../../layout/Block";
import Card from "../../layout/Card";
import Line from "../../layout/Line";
import Paragraph from "../../layout/Paragraph";
import IconMunicipality from "../../icons/Municipality";

import style from "./styles/PinnedCard.module.scss";

const PinnedCard = (props: { post: postMuni; language: indexedObjAny,action:(arg0:postMuni)=>void }) => {
  const handleClick = () => {};

  const { direction } = props.language;
  const iconStyle = styleFactory("icon", direction);
  return (
    <Card
      direction={direction}
      id={props.post._id}
      margin={25}
      action={handleClick}>
      <div className={style[iconStyle]}>
        <IconMunicipality filled color='primary' />
      </div>
      <Block>
        <Line thin direction={direction}>
          <span className={style.title}>{shortText(props.post.title, 55)}</span>
        </Line>
        <Line direction={direction}>
          <span className={style.date}>
            {dateBeautify(props.post.date, direction)}
          </span>
        </Line>
        <Paragraph flat>
          <span className={style.text}>{shortText(props.post.text, 95)}</span>
        </Paragraph>
      </Block>
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
