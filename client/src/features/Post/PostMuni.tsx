import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { indexedObjAny } from "../../store/types";

import { Photo, Link, Text } from "./components";

import Block from "../../layout/Block";

import style from "./style/Post.module.scss";

const PostMuni = (props: { post: any; language: indexedObjAny }) => {
  const { post } = props;
  const { direction } = props.language;
console.log(props)
  return (
    <div className={style.post}>
      <Photo src={post.photo} />
      <Block>
        <Link primary text={post.link} direction={direction} />
      </Block>
      <Text muni text={post.text} direction={direction} /> */}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,

    post: state.locationData.municipality.filter(
      // @ts-ignore
      (post: any) => post._id === state.post._id
    )[0]
  };
};

export default connect(
  mapStateToProps,
  {}
)(PostMuni);
