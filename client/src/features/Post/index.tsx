import React, { useState } from "react";
import { connect } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { categoryIdToName } from "../../modules/category_processor";
import { replyCardStyleUtil } from "../../modules/reply_style_generator";
import { goBack, iconEdit } from "../../icons";

import { AppState } from "../../store";
import {
  vote,
  setModule,
  fetchData,
  getPosts
} from "../../store/users/actions";
import { updatePost } from "../../store/post/actions";
import { indexedObjAny, post, data } from "../../store/types";

import VoteButton from "../../components/VoteButton";
import Header from "../../components/Header";
import Modal from "../../components/Modal";

import {
  Photo,
  Link,
  Text,
  TopBlock,
  ShowMore,
  NumbersLine,
  NewReply,
  Voted,
  SetOfThumbs,
  ReplyVotes,
  NewReplyButton,
  ModalView
} from "./components";

import Line from "../../layout/Line";
import Content from "../../layout/Content";

import style from "./style/Post.module.scss";
import styleFactory from "../../modules/style_factory";

const Post = (props: {
  post: post;
  language: indexedObjAny;
  location: data;
  vote: (arg0: string, arg1: string) => void;
  updatePost: (arg0: any) => void;
  setModule: (arg0: string) => void;
  fetchData: (arg0: string) => void;
  getPosts: (arg0: string) => void;
  prevModule: string;
  token: string;
}) => {
  const { categories } = props.location;

  const { direction, text, short } = props.language;

  const [textOpened, setTextOpened] = useState(false);
  const [replyOpened, setReplyOpened] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [showNewReply, setShowNewReply] = useState(false);

  const [post, setPost] = useState(props.post);
  const {
    _id,
    title,
    photo,
    link,
    problem,
    solution,
    votes,
    createdBy,
    date,
    reply
  } = post;
  // } = props.post;

  const showStyle = textOpened ? style.text : style.textClosed;
  const voterText =
    votes.length === 1 ? text["post.voter"] : text["post.voters"];
  const category = categoryIdToName(categories, short, props.post.category);
  const showMoreLessText = {
    more: text["post.show-more"],
    less: text["post.show-less"]
  };

  const handleVoteClick = () => {
    setShowConfirm(!showConfirm);
    // props.vote(_id, props.location._id);
    const url = `/post/${_id}/vote?user=${props.location._id}`;
    axios({
      method: "patch",
      url
    })
      .then((response: AxiosResponse<any>) => {
        setPost({ ...post, votes: [...post.votes, props.location._id] });
        props.getPosts(props.location.location);
      })
      .catch((error: AxiosResponse<any>) => console.log(error));
  };
  const handleReplyVoting = (updown: boolean) => {
    console.log(updown);
    let newVotesUp = reply.up;
    let newVotesDown = reply.down;

    if (updown) {
      newVotesUp.push(props.location._id);
    } else {
      newVotesDown.push(props.location._id);
    }

    const url = `/post/${_id}/reply/vote?user=${props.location._id}&vote=${updown}`;
    axios({
      method: "get",
      url
    })
      .then((response: AxiosResponse<any>) => {
        setPost({
          ...post,
          reply: { ...post.reply, up: newVotesUp, down: newVotesDown }
        });
        props.getPosts(props.location.location);
      })
      .catch((error: AxiosResponse<any>) => console.log(error));
  };

  const handleNewReplyChange = (event: any) => {
    switch (event.target.name) {
      case "replyText":
        setNewReply(event.target.value);
        break;
    }
  };

  const handleNewReplySubmit = () => {
    if (newReply) {
      props.updatePost({
        _id: _id,
        fields: { reply: { text: newReply, date: new Date() } }
      });
    }
    setShowNewReply(false);
  };

  const toggleShowNewReplyButton = () => {
    setShowNewReply(!showNewReply);
  };
  const ageText: { [index: string]: string } = text["post.age"];


  const numbersLine = (
    <NumbersLine
      date={date}
      daysText={ageText}
      direction={direction}
      votes={votes.length}
      voterText={voterText}
    />
  );

  const modal = showConfirm ? (
    <ModalView close={handleVoteClick} text={text["vote.thanks"]} />
  ) : null;

  const includes = votes.includes(props.location._id);
  const author = createdBy === props.location._id;
  const muniUser = props.location.type === "muni";

  let voteButton =
    includes || author || muniUser ? null : (
      <div className={style.voteButton} onClick={() => handleVoteClick()}>
        <VoteButton />
      </div>
    );

  if (votes.includes(props.location._id))
    voteButton = <Voted text={text["post.voted"]} direction={direction} />;

  let newReplyButton: any = "";
  let newReplyComponent: any = "";
  let ReplyMessage: any = "";
  let setOfThumbs: any = "";

  newReplyButton =
    muniUser && !reply ? (
      <NewReplyButton action={toggleShowNewReplyButton} />
    ) : null;
  newReplyComponent = showNewReply ? (
    <Modal disabled close={handleNewReplySubmit}>
      <NewReply
        label={text["newreply.label"]}
        value={newReply}
        placeholder={text["newreply.placeholder"]}
        action={handleNewReplyChange}
        direction={direction}
        submit={handleNewReplySubmit}
        submitText={text["login.button.submit"]}
      />
    </Modal>
  ) : null;

  const allowToReply = [...post.reply.up, ...post.reply.down].includes(
    props.location._id
  );

  if (reply) {
    const { replyCardStyle, replyCardColor } = replyCardStyleUtil(
      reply,
      replyOpened
    );

    if (reply.text && !allowToReply) {
      setOfThumbs = (
        <SetOfThumbs fill={replyCardColor} onClick={handleReplyVoting} />
      );
    } else if (allowToReply) {
      setOfThumbs = <Voted text={text["post.voted"]} direction={direction} />;
    }

    const replyVotes = (
      <ReplyVotes replies={{ up: reply.up, down: reply.down }} />
    );

    ReplyMessage = reply.text ? (
      <div className={style[replyCardStyle]}>
        <div className={style[styleFactory("replyTitleLine", direction)]}>
          {replyVotes}
          <span className={style.replyCardTitle}>
            {text["munireply.title"]}
          </span>
        </div>
        <div className={style.replyMessage}>{reply.text}</div>
        {reply.text.length > 50 ? (
          <ShowMore
            color='white'
            title={showMoreLessText}
            direction={direction}
            opened={replyOpened}
            action={setReplyOpened}
          />
        ) : null}
      </div>
    ) : null;
  }

  // TODO: change
  const mockEdit = false;
  const mockFnEdit = () => {};
  const goHome = () => {
    props.setModule(props.prevModule);
  };

  const edit =
    !author && !muniUser
      ? {
          right: { icon: iconEdit("primary"), action: mockFnEdit, noRtl: true }
        }
      : null;
  const headerObject = {
    name: props.location.name[props.language.short],
    ...edit,
    left: { icon: goBack("primary"), action: goHome }
  };
  return (
    <Content header>
      <Header {...headerObject} />
      <div className={style.wrapper}>
        <div data-testid='post__view' id={_id} className={style.post}>
          <TopBlock
            category={category}
            title={title}
            numbersLine={numbersLine}
          />
          <Photo src={photo} edit={mockEdit} />
          <Link primary text={link} direction={direction} edit={mockEdit} />
          <div className={showStyle}>
            <Text
              step
              title={text["post.problem"]}
              text={problem}
              direction={direction}
            />
            <Text
              back
              title={text["post.solution"]}
              text={solution}
              direction={direction}
            />
          </div>
          <ShowMore
            color='primary'
            title={showMoreLessText}
            direction={direction}
            opened={textOpened}
            action={setTextOpened}
          />
        </div>
        <div className={style.voted}>{voteButton}</div>
        {modal}
        {newReplyButton}
        {newReplyComponent}
        {ReplyMessage}
        <div className={style.replyVoted}>{setOfThumbs}</div>
      </div>
    </Content>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    location: state.locationData,
    // @ts-ignore
    post: state.posts.filter((post: any) => post._id === state.post._id)[0],
    mode: state.mode,
    prevModule: state.prevModule,
    token: state.token
  };
};

export default connect(
  mapStateToProps,
  { vote, updatePost, setModule, fetchData, getPosts }
)(Post);
