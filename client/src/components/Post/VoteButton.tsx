import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { indexedObjAny } from "../../store/types";

import style from "../../styles/VoteButton.module.scss";

const CardVoteButton = (props: { language: indexedObjAny }) => {
  const { text } = props.language;
  return (
    <button className={style.vote}>
      <div className={style.inner}>
        <span>{text["card.button.vote"]}</span>
      </div>
    </button>
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
)(CardVoteButton);
