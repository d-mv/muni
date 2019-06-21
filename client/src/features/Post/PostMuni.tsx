import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { indexedObjAny, postMuni } from "../../store/types";

import Photo from "./components/Photo";
import Link from "./components/Link";
import Text from "./components/Text";

import Block from "../../layout/Block";

import style from "./style/Post.module.scss";

const Post = (props: {
  // post: postMuni;
  // language: indexedObjAny;
  // preview?: boolean;
  // muni?: boolean;
  // edit?: boolean;
}) => {
  // const { post } = props;
  // const { direction } = props.language;
  // const { text } = props.language;

  return (
    <div className={style.post}>
      {/* <Photo src={post.photo} />
      <Block>
        <Link primary text={post.link} direction={direction} />
      </Block>
      <Text muni text={post.text} direction={direction} /> */}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    // language: state.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(Post);
