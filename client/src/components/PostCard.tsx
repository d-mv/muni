import React from "react";
import CardVoteButton from "./Post/VoteButton";
import { connect } from "react-redux";

import { AppState } from "../store";
import { post, indexedObjAny } from "../store/types";

import Voters from "./Post/Voters";
import postDays from "../modules/post_days";
import style from "../styles/PostCard.module.scss";

const PostCard = (props: { post: post; language: indexedObjAny }) => {
  const { text } = props.language;
  const { direction } = props.language;
  // const direction = "rtl";

  const age = postDays(props.post.date);

  const voterText =
    props.post.votes.up === 1 ? text["post.voter"] : text["post.voters"];

  const image = {
    background: `url(${
      props.post.photo
    }) no-repeat scroll center center / cover`
  };

  return (
    <article className={direction === "rtl" ? style.cardRight : style.card}>
      <div style={image} className={style.photo} />
      <section className={style.information}>
        <div id='category' className={style.category}>
          {props.post.category}
        </div>
        <h2 id='title' className={style.title}>
          {props.post.title}
        </h2>
        <section id='age' className={style.thirdLine}>
          <div>
            <p>
              {age.toLocaleString()}
              <span className={style.ageText}>
                {age === 1 ? text["post.age.day"] : text["post.age.days"]}
              </span>
            </p>
            <span className={style.voters}>
              <Voters
                number={props.post.votes.up}
                text={voterText}
                direction={direction}
              />
            </span>
          </div>
          <span className={style.voteButton}>
            <CardVoteButton />
          </span>
        </section>
      </section>
    </article>
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
)(PostCard);
