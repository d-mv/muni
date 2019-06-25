import React, { useState } from "react";
import { connect } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { categoryIdToName } from "../../modules/category_processor";
import { replyCardStyleUtil } from "../../modules/reply_style_generator";
import { goBack, iconEdit, iconClose } from "../../icons";

import { AppState } from "../../store";
import {
  vote,
  setModule,
  fetchData,
  getPosts
} from "../../store/users/actions";
import { updatePost, deletePost, showPost } from "../../store/post/actions";
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
  ModalView,
  Confirm
} from "./components";

import Content from "../../layout/Content";

import style from "./style/Post.module.scss";
import styleFactory from "../../modules/style_factory";
import Button from "../../components/Button";
import { showPostPayload } from "../../store/post/types";

const Post = (props: {
  post: post;
  language: indexedObjAny;
  location: data;
  vote: (arg0: string, arg1: string) => void;
  updatePost: (arg0: any) => void;
  setModule: (arg0: string) => void;
  getPosts: (arg0: string) => void;
  prevModule: string;
  token: string;
  deletePost: (arg0: string) => void;
  showPost: (arg0: showPostPayload) => void;
}) => {
  // destructuring props
  const { categories } = props.location;
  const { direction, text, short } = props.language;
  // state
  const [textOpened, setTextOpened] = useState(false);
  const [replyOpened, setReplyOpened] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [showNewReply, setShowNewReply] = useState(false);
  const [post, setPost] = useState(props.post);
  const [edit, setEdit] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [updateConfirmation, showUpdateConfirmation] = useState(false);

  // destructuring state
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

  // definitions
  const showStyle = textOpened ? style.text : style.textClosed;
  const voterText =
    votes.length === 1 ? text["post.voter"] : text["post.voters"];
  const category = categoryIdToName(categories, short, props.post.category);
  const showMoreLessText = {
    more: text["post.show-more"],
    less: text["post.show-less"]
  };
  const includes = votes.includes(props.location._id);
  const author = createdBy === props.location._id;
  const muniUser = props.location.type === "muni";
  const allowToReply = [...post.reply.up, ...post.reply.down].includes(
    props.location._id
  );

  // toggles
  const toggleShowNewReplyButton = () => {
    setShowNewReply(!showNewReply);
  };
  const toggleEdit = () => {
    setEdit(!edit);
  };
  const toggleCloseSave = () => {
    showUpdateConfirmation(!updateConfirmation);
  };

  const toggleDeleteConfirmation = () => {
    setDeleteConfirmation(!deleteConfirmation);
  };

  // small functions
  const goHome = () => {
    props.setModule(props.prevModule);
  };
  const handleDelete = (mode: string) => {
    if (mode === "secondary") {
      props.deletePost(_id);
      props.getPosts(props.location.location);
      props.setModule("home");
    }
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
  const handleUpdate = (answer: string) => {
    console.log(answer);
    if (answer === "attention") {
      toggleEdit();
      setPost(props.post);
      toggleCloseSave();
    } else {
      const url = `/post/${_id}`;
      axios
        .patch(url, { post: JSON.stringify(post) })
        .then((response: AxiosResponse<any>) => {
          toggleEdit();
          props.getPosts(props.location.location);
        })
        .catch((reason: any) => {
          console.log(reason);
        });
    }
  };

  // !
  const handleRemovePhoto = () => {
    setPost({ ...post, photo: "" });
  };
  const handleRemoveLink = () => {
    setPost({ ...post, link: "" });
  };
  const handleSetPhoto = (photo: string) => {
    setPost({ ...post, photo });
  };
  const handleSetLink = (link: string) => {
    setPost({ ...post, link });
  };
  // ! -

  // async handlers
  const handleVoteClick = () => {
    setShowConfirm(!showConfirm);
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

  // numbers line
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

  // setting up components
  const modal = showConfirm ? (
    <ModalView close={handleVoteClick} text={text["vote.thanks"]} />
  ) : null;

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

  // if there is muni reply
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
  // modals
  const deleteConfirmationComponent = deleteConfirmation ? (
    <Confirm
      text={text["post.delete.confirm"]}
      close={toggleDeleteConfirmation}
      action={handleDelete}
      direction={direction}
    />
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

  const updateConfirmComponent = updateConfirmation ? (
    <div>
      <Confirm
        text={text["post.update.confirm"]}
        close={toggleCloseSave}
        action={handleUpdate}
        direction={direction}
      />
    </div>
  ) : null;

  const deleteButton = edit ? (
    <div className={style.deleteButton}>
      <Button mode='attention' action={toggleDeleteConfirmation}>
        {text["post.delete.button"]}
      </Button>
    </div>
  ) : null;

  // default
  let editIcon =
    author && !muniUser
      ? {
          right: {
            icon: iconEdit("primary"),
            action: toggleEdit,
            noRtl: true
          }
        }
      : null;
  // edit mode
  if (edit)
    editIcon = {
      right: {
        icon: iconClose("primary"),
        action: toggleCloseSave,
        noRtl: true
      }
    };

  const headerObject = {
    name: props.location.name[props.language.short],
    ...editIcon,
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
          <Photo
            src={photo}
            edit={edit}
            actions={{ set: handleSetPhoto, remove: handleRemovePhoto }}
          />
          <Link
            primary
            text={link}
            direction={direction}
            edit={edit}
            actions={{ set: handleSetLink, remove: handleRemoveLink }}
            editText={{
              message: text["post.link.edit"],
              confirm: text["confirm"],
              cancel: text["cancel"],
              label: text["new.field.link.label"],
              placeholder: text["new.field.link.prompt"]
            }}
          />
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
        {reply.text ? (
          <div className={style.replyVoted}>{setOfThumbs}</div>
        ) : null}
        {deleteButton}
        {deleteConfirmationComponent}
        {updateConfirmComponent}
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
  { vote, updatePost, setModule, fetchData, getPosts, deletePost, showPost }
)(Post);
