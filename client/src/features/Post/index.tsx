import React from "react";
import { connect } from "react-redux";

import { categoryIdToName } from "../../modules/category_processor";

import { AppState } from "../../store";
import { vote } from "../../store/users/actions";
import { updatePost } from "../../store/post/actions";
import { indexedObjAny, post, data } from "../../store/types";

import Photo from "./components/Photo";
import Link from "./components/Link";
import Text from "./components/Text";
import TopBlock from "./components/TopBlock";
import ShowMore from "./components/ShowMore";
import NumbersLine from "./components/NumbersLine";
import VoteButton from "../../components/VoteButton";
import Modal from "../../components/Modal";

import style from "./style/Post.module.scss";
import Center from "../../layout/Center";
import NewReply from "./components/NewReply";
import Button from "../../components/Button";
import Card from "../../layout/Card";
import Line from "../../layout/Line";

const Post = (props: {
  post: any;
  language: indexedObjAny;
  location: data;
  preview?: boolean;
  edit?: boolean;
  vote: (arg0: string, arg1: string) => void;
  action: (arg0: { _id: string; action: string; fields?: any }) => void;
  updatePost: (arg0: any) => void;
}) => {
  const { categories } = props.location;
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
  } = props.post;
  const { direction, text, short } = props.language;

  const [textOpened, setTextOpened] = React.useState(false);
  const [replyOpened, setReplyOpened] = React.useState(false);

  const [showConfirm, setShowConfirm] = React.useState(false);
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
    props.action({ _id, action: "vote" });
  };

  const numbersLine = (
    <NumbersLine
      date={date}
      daysText={[text["post.age.day"], text["post.age.days"]]}
      direction={direction}
      votes={votes.length}
      voterText={voterText}
    />
  );
  const modal = showConfirm ? (
    <Modal close={handleVoteClick}>
      <div className={style.square}>
        <Center>
          <span className={style.modalText}>{text["vote.thanks"]}</span>
        </Center>
      </div>
    </Modal>
  ) : null;

  const includes = votes.includes(props.location._id);
  const author = createdBy === props.location._id;
  const muniUser = props.location.type === "muni";

  const voteButton =
    includes || author || muniUser ? null : (
      <div className={style.voteButton} onClick={() => handleVoteClick()}>
        <VoteButton />
      </div>
    );

  const [newReply, setNewReply] = React.useState("");
  const [showNewReply, setShowNewReply] = React.useState(false);
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

  const newReplyButton =
    muniUser && !reply ? (
      <div className={style.buttonWrapper}>
        <Button mode='primary' action={toggleShowNewReplyButton}>
          new reply
        </Button>
      </div>
    ) : null;

  const newReplyComponent = showNewReply ? (
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

  const ReplyMessage = reply ? (
    <div className={style.replyCardSecondary}>
      <Line direction={direction}>
        <span className={style.replyCardTitle}>{text["munireply.title"]}</span>
      </Line>
      <div className={style.replyMessage}>{reply.text}</div>
      <ShowMore
        color='white'
        title={showMoreLessText}
        direction={direction}
        opened={replyOpened}
        action={setReplyOpened}
      />
    </div>
  ) : null;

  return (
    <div>
      <div data-testid='post__view' id={_id} className={style.post}>
        <TopBlock category={category} title={title} numbersLine={numbersLine} />
        <Photo src={photo} edit={props.edit} />
        <Link primary text={link} direction={direction} edit={props.edit} />
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
      {voteButton}
      {modal}
      {newReplyButton}
      {newReplyComponent}
      {ReplyMessage}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    location: state.locationData
  };
};

export default connect(
  mapStateToProps,
  { vote, updatePost }
)(Post);
