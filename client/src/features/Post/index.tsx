import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { indexedObj, indexedObjAny } from "../../store/types";

import Category from "../Card/components/Category";
import Title from "../Card/components/Title";
import Photo from "./components/Photo";
import Link from "./components/Link";
import Problem from "./components/Problem";
import Solution from "./components/Solution";

import Block from "../../layout/Block";

const Post = (props: { post: indexedObjAny; language: indexedObj }) => {
  const { post } = props;
  const { direction } = props.language;
  return (
    <Block rectangle>
      <Category category={post.category} />
      <Title title={post.title} direction={direction} />
      <Photo src={post.photo} />
      <Link text={post.link} />
      <Problem text={post.problem} />
      <Solution text={post.solution} />
    </Block>
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
