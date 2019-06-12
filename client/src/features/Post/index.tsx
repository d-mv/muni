import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { indexedObjAny, post, postPreview, postEmpty } from "../../store/types";

import Photo from "./components/Photo";
import Link from "./components/Link";
import Text from "./components/Text";

import Block from "../../layout/Block";

import style from "./styles/Post.module.scss";
import TopBlock from "./components/TopBlock";

const Post = (props: {
  post: post | postPreview;
  language: indexedObjAny;
  preview?: boolean;
}) => {
  const { post } = props;
  const { direction } = props.language;
  const { text } = props.language;

  return (
    <div className={style.post}>
      <TopBlock category={post.category} title={post.title} />
      <Photo src={post.photo} />
      <Block>
        <Link primary text={post.link} direction={direction} />
      </Block>
      <Text
        step
        title={text["post.problem"]}
        text={post.problem}
        direction={direction}
      />
      <Text
        back
        title={text["post.solution"]}
        text={post.solution}
        direction={direction}
      />
    </div>
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
)(Post);
