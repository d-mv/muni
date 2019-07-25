import React from "react";
import { connect } from "react-redux";

import shortText from "../../modules/short_text";

import { AppState } from "../../store";
import { showPost } from "../../store/post/actions";
import { indexedObjAny, data } from "../../store/types";
import { showPostPayload } from "../../store/post/types";

import Age from "./components/Age";
import Photo from "./components/Photo";

import Title from "../../styles/common/Title";
import Card from "../../styles/Card";
import Section from "../../styles/Section";
import InLine from "../../styles/utils/InLine";

const CardMuni = (props: {
  muni?: boolean;
  post: data;
  language: indexedObjAny;
  showPost: (arg0: showPostPayload) => void;
}) => {
  const { text, direction } = props.language;
  const { title, photo, createdAt } = props.post;

  const handleClick = () => {
    props.showPost({ show: true, type: "news", ...props.post });
  };
  const ageText: { [index: string]: string } = text["post.age"];

  return (
    <Card onClick={handleClick}>
      <Photo photo={photo} />
      <Section direction={direction}>
        <Title direction={direction}>{shortText(title, 50)}</Title>
        <InLine direction={direction} justify='space-between'>
          <InLine direction={direction} justify='flex-start' padding='0 1rem'>
            <Age date={createdAt} text={ageText} direction={direction} />
          </InLine>
        </InLine>
      </Section>
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
  { showPost }
)(CardMuni);
