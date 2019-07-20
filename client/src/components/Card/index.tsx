import React from "react";
import { connect } from "react-redux";

import shortText from "../../modules/short_text";
import { categoryIdToName } from "../../modules/category_processor";

import { AppState } from "../../store";
import { indexedObjAny, data } from "../../store/types";

import { showPost } from "../../store/post/actions";
import Voters from "./components/Voters";
import VoteButton from "../VoteButton";
import Photo from "./components/Photo";
import Category from "../../styles/common/Category";
import Title from "../../styles/common/Title";
import Age from "./components/Age";
import { RepliedTag } from "./components";
import Card from "../../styles/Card";
import { Zero } from "../../layout/Utils";

import style from "./style/PostCard.module.scss";
import { showPostPayload } from "../../store/post/types";
import { PostType } from "../../models/post";
import Section from "../../styles/Section";
import InLine from "../../styles/utils/InLine";
import { secondary, secondary70 } from "../../styles/_colors";

const PostCard = (props: {
  post: PostType;
  language: indexedObjAny;
  categories: any;
  auth: data;
  showPost: (arg0: showPostPayload) => void;
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
  const cardRef = React.createRef<HTMLElement>();

  const handleClick = () => {
    props.showPost({ show: true, type: "user", ...props.post });
  };

  let voterText = "";
  let voterElement: React.ClassicElement<any> = <Zero />;

  const categoryTranslated = categoryIdToName(
    categories,
    short,
    category || ""
  );

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
        <VoteButton title={text["card.button.vote"]} />
      </span>
    ) : (
      <div className={style.button} />
    );

  const ageText: { [index: string]: string } = text["post.age"];
  return (
    <Card onClick={() => handleClick()}>
      <Photo photo={photo}>
        <InLine
          justify='flex-start'
          direction={direction}
          height='inherit'
          align='flex-end'>
          <Category>{categoryTranslated}</Category>
          {reply.text ? (
            <Category back={secondary70}>{text["post.replied"]}</Category>
          ) : null}
        </InLine>
      </Photo>
      <Section direction={direction}>
        <Title direction={direction}>{shortText(title, 50)}</Title>
        <InLine direction={direction} justify='space-between'>
          <InLine direction={direction} justify='flex-start' padding='0 1rem'>
            <Age date={createdAt} text={ageText} direction={direction} />
            {voterElement}
          </InLine>
          {voteButtonElement}
        </InLine>
      </Section>
    </Card>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    categories: state.categories,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { showPost }
)(PostCard);
