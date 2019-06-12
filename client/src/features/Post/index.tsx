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

import { IconLink } from "../../icons";

import Block from "../../layout/Block";
import Line from "../../layout/Line";
import Section from "../../layout/Section";

import style from "./styles/Post.module.scss";

const Post = (props: { post: indexedObjAny; language: indexedObjAny }) => {
  const { post } = props;
  const { direction } = props.language;
  const { text } = props.language;
  
  return (
    <div className={style.post}>
      <Block>
        <Category category={post.category} />
        <h3>{post.title}</h3>
      </Block>
      <Photo src={post.photo} />
      <Block>
        <Line flat direction={direction}>
          <IconLink primary />
          <Link text={post.link} />
        </Line>{" "}
      </Block>
      <Section step>
        <Line direction={direction}>
          <h4>{text["post.problem"]}</h4>
        </Line>
        <Problem text={post.problem} />
      </Section>
      <Section back>
        <Line flat direction={direction}>
          <h4>{text["post.solution"]}</h4>
        </Line>
        <Solution text={post.solution} />
      </Section>
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
