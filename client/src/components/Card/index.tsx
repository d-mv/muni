import React from "react";
import { connect } from "react-redux";

import shortText from "../../modules/short_text";
import { categoryIdToName } from "../../modules/category_processor";

import { AppState } from "../../store";
import { post, indexedObjAny, data } from "../../store/types";
import { cachePost } from "../../store/users/actions";
import { showPost } from "../../store/post/actions";
import Voters from "./components/Voters";
import VoteButton from "../VoteButton";
import Photo from "./components/Photo";
import Category from "./components/Category";
import Title from "./components/Title";
import Age from "./components/Age";
import { RepliedTag } from "./components";
import Card from "../../layout/Card";
import { Zero } from "../../layout/Utils";

import style from "./styles/PostCard.module.scss";
import { showPostPayload } from "../../store/post/types";
import { PostType } from "../../models/post";
import styleFactory from "../../modules/style_factory";

const PostCard = (props: {
  post: PostType;
  language: indexedObjAny;
  categories: any;
  auth: data;
  showPost: (arg0: showPostPayload) => void;
  // locationData: data;
}) => {
  const { categories } = props;
  const { user } = props.auth;
  const { text, direction, short } = props.language;
  const {
    _id,
    title,
    createdAt,
    photo,
    category,
    createdBy,
    reply
  } = props.post;
  const votes = props.post.votes ? props.post.votes : [];

  const handleClick = () => {
    props.showPost({ show: true, type: "user", _id: _id });
  };

  let voterText = "";
  let categoryElement: React.ClassicElement<any> = <Zero />;
  let voterElement: React.ClassicElement<any> = <Zero />;
  // let voteButtonElement: React.ClassicElement<any> = <div className={style.button}/>;

  // const { categories } = props.locationData;
  const categoryTranslated = categoryIdToName(
    categories,
    short,
    category || ""
  );
  categoryElement = <Category category={categoryTranslated} />;
  voterText = votes.length === 1 ? text["post.voter"] : text["post.voters"];
  voterElement = (
    <Voters number={votes.length} text={voterText} direction={direction} />
  );
  const author = createdBy === user._id;
  const voted = votes.includes(user._id);
  const muniUser = user.type === "muni";

  const voteButtonElement =
    !author && !voted && !muniUser ? (
      <span className={style.button}>
        <VoteButton />
      </span>
    ) : (
      <div className={style.button} />
    );

  const replyTag = reply.text ? (
    <RepliedTag text={text["post.replied"]} direction={direction} />
  ) : null;
  const ageText: { [index: string]: string } = text["post.age"];
  return (
    <Card id={_id} direction={direction} action={handleClick}>
      <Photo photo={photo} direction={direction}>
        {replyTag}
      </Photo>
      <section
        className={
          direction === "rtl" ? style.informationRTL : style.information
        }>
        {categoryElement}
        <Title title={shortText(title, 50)} direction={direction} />
        <section id='age' className={style[styleFactory("data", direction)]}>
          <Age date={createdAt} text={ageText} direction={direction} />
          {voterElement}
        </section>
        {voteButtonElement}
      </section>
    </Card>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    categories: state.categories,
    auth: state.auth
    // locationData: state.locationData
  };
};

export default connect(
  mapStateToProps,
  { showPost }
)(PostCard);