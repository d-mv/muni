import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { categoryIdToName } from "../../modules/category_processor";
import { replyCardStyleUtil } from "../../modules/reply_style_generator";
import { goBack, iconEdit, iconClose, votersSecondary } from "../../icons";

import { AppState } from "../../store";
import { vote, setModule, fetchData } from "../../store/users/actions";
import {
  updatePost,
  deletePost,
  showPost,
  getPosts,
  votePost
} from "../../store/post/actions";
import { indexedObjAny, data } from "../../store/types";

import VoteButton from "../../components/VoteButton";
import Header from "../../components/Header";
import Modal from "../../components/Modal";

import {
  Photo,
  Link,
  ShowMore,
  NumbersLine,
  NewReply,
  Voted,
  ReplyVotes,
  NewReplyButton,
  ModalView,
  Confirm,
  ModalEdit
} from "./components";
import Text from "./components/Text";

import PostCard from "../../styles/Post";
import Content from "../../styles/Content";
import style from "./style/Post.module.scss";
import styleFactory from "../../modules/style_factory";
import Button from "../../components/Button";
import { AuthState } from "../../models";
import { emptyPost } from "../../store/defaults";
import logger from "../../modules/logger";
import ReplyTag from "../../styles/post/ReplyTag";
import Spacer from "../../styles/utils/Spacer";
import AlreadyPosted from "../../styles/post/AlreadyPosted";
import InLine from "../../styles/utils/InLine";
import Section from "../../styles/Section";
import Category from "../../styles/common/Category";
import Title from "../../styles/common/Title";
import Field from "../../styles/form/Field";
import Reply from "../../styles/post/Reply";
import { secondary70 } from "../../styles/_colors";
import PlainText from "../../styles/post/PlainText";
import newsLink from "../../modules/news_link";

const Post = (props: {
  posts: any;
  news: any;
  post: any;
  language: indexedObjAny;
  votePost: (arg0: string) => void;
  // location: data;
  vote: (arg0: string, arg1: string) => void;
  updatePost: (arg0: any) => void;
  setModule: (arg0: string) => void;
  getPosts: (arg0: string) => void;
  prevModule: string;
  token: string;
  deletePost: (arg0: string) => void;
  showPost: (arg0: any) => void;
  auth: AuthState;
  categories: any;
  locations: data;
}) => {
  // destructuring props
  const { categories, auth, locations, post } = props;
  const { user } = auth;
  const { direction, text, short } = props.language;
  // state
  const [textOpened, setTextOpened] = useState(false);
  const [replyOpened, setReplyOpened] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNewReply, setShowNewReply] = useState(false);
  // const [newReply, setNewReply] = useState(post.reply.text);
  const replyRef = React.createRef<HTMLDivElement>();

  const originalPost = props.posts.filter(
    (post: any) => post._id === props.post._id
  )[0];

  const [edit, setEdit] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [updateConfirmation, showUpdateConfirmation] = useState(false);
  const [muniEdit, setMuniEdit] = useState(false);
  const [muniDeleteConfirmation, setMuniDeleteConfirmation] = useState(false);
  const [showMuniEditModal, setMuniEditModal] = useState(false);

  const location = locations.filter((el: any) => el._id === user.location)[0];

  // definitions
  const showStyle = textOpened ? style.text : style.textClosed;
  const voterText =
    post.votes.length === 1 ? text["post.voter"] : text["post.voters"];
  const category = categoryIdToName(categories, short, post.category);
  const showMoreLessText = {
    more: text["post.show-more"],
    less: text["post.show-less"]
  };
  const includes = post.votes.includes(props.auth.user._id);
  const author = post.createdBy === props.auth.user._id;
  const muniUser = auth.user.type === "muni";

  useEffect(() => {
    console.log("posts changed");
    props.showPost(
      props.posts.filter((post: any) => post._id === props.post._id)[0]
    );
  }, [props.posts]);

  let allowToReply = false;
  if (!post.reply.up && !post.reply.down) {
    allowToReply = true;
  } else if (post.reply.up.length > 0 && post.reply.down.length > 0) {
    allowToReply = [...post.reply.up, ...post.reply.down].includes(
      props.auth.user._id
    );
  } else if (post.reply.up.length > 0) {
    allowToReply = post.reply.up.includes(props.auth.user._id);
  } else if (post.reply.down.length > 0) {
    allowToReply = post.reply.down.includes(props.auth.user._id);
  }

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

  const toggleShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  const toggleDeleteConfirmation = () => {
    setDeleteConfirmation(!deleteConfirmation);
  };

  const toggleMuniEdit = () => {
    setMuniEdit(!muniEdit);
  };
  const toggleMuniDeleteConfirmation = () => {
    setMuniDeleteConfirmation(!muniDeleteConfirmation);
  };
  const toggleMuniEditModal = () => {
    setMuniEditModal(!showMuniEditModal);
  };

  // small functions
  const goHome = () => {
    props.showPost({ show: false, ...emptyPost });
    props.setModule(props.prevModule);
  };

  // edit
  const handleRemovePhoto = () => {
    props.showPost({ photo: "" });
  };
  const handleRemoveLink = () => {
    props.showPost({ link: "" });
  };
  const handleSetPhoto = (photo: string) => {
    props.showPost({ photo });
  };
  
  const handleSetLink = (link: string) => {
    props.showPost({ link });
  };

  const handleReplyChange = (event: any) => {
    props.showPost({ reply: { text: event.target.value } });
  };

  // submit
  const submitUpdatePost = (answer?: string) => {
    logger({
      text: "submitUpdatePost:",
      emph: answer || "",
      type: "positive"
    });
    setMuniEditModal(false);
    setMuniEdit(false);
    setShowNewReply(false);
    if (answer) {
      setEdit(false);
      showUpdateConfirmation(false);
      if (answer === "attention") {
        props.showPost(originalPost);
      } else {
        props.updatePost(post);
      }
    } else {
      props.updatePost(post);
    }
  };
  const submitVote = () => {
    setShowConfirm(true);
    setTimeout(() => {
      setShowConfirm(false);
    }, 2000);
    props.showPost({ ...post, votes: [post.votes, user._id] });
    props.votePost(post._id);
  };

  const submitDeletePost = (answer: string) => {
    logger({ text: "submitDeletePost:", emph: answer, type: "positive" });

    if (answer === "secondary") {
      props.deletePost(post._id);
      props.setModule(props.prevModule);
    }
  };

  const submitDeleteMuniReply = (answer: string) => {
    logger({ text: "submitDeletePost:", emph: answer, type: "positive" });

    if (answer === "primary") {
      const newPost = { ...post, reply: {} };
      props.showPost(newPost);
      props.updatePost(newPost);
    }
    setMuniEdit(false);
  };

  // TODO: refactor

  const handleReplyVoting = (updown: boolean) => {
    console.log("object");
    logger({
      text: "handleReplyVoting:",
      emph: updown.toString(),
      type: "positive"
    });

    let up = post.reply.up;
    let down = post.reply.down;

    if (updown) {
      up.push(props.auth.user._id);
    } else {
      down.push(props.auth.user._id);
    }
    const reply = { ...post.reply, reply: { ...post.reply, up, down } };
    const newPost = { ...post, reply };
    props.showPost(newPost);
    props.updatePost({ ...post, reply });
  };

  // numbers line
  const ageText: { [index: string]: string } = text["post.age"];

  // setting up components
  const modal = showConfirm ? (
    <ModalView close={toggleShowConfirm} text={text["vote.thanks"]} />
  ) : null;

  const voted = post.votes.includes(props.auth.user._id);
  console.log("voted ", voted);
  const renderVoteButton = () => {
    if (voted) return <AlreadyPosted>{text["post.voted"]}</AlreadyPosted>;

    const allowed = includes || author || muniUser;
    if (!allowed)
      return (
        <div className={style.voteButton} onClick={() => submitVote()}>
          <VoteButton title={text["card.button.vote"]} />
        </div>
      );
  };

  let newReplyComponent: any = "";
  let ReplyMessage: any = "";
  let setOfThumbs: any = "";

  const newReplyButton =
    muniUser && !post.reply.text ? (
      <NewReplyButton
        action={toggleShowNewReplyButton}
        text={text["post.muni.newreply"]}
      />
    ) : null;

  // if there is muni reply
  if (post.reply) {
    if (post.reply.text && !allowToReply) {
      setOfThumbs = (
        <div className={style[styleFactory("thumbsContainer", direction)]}>
          <div onClick={(event: any) => handleReplyVoting(true)}>
            {goBack("white")}
          </div>
          <div onClick={(event: any) => handleReplyVoting(false)}>
            {goBack("white")}
          </div>
        </div>
      );
    } else if (allowToReply) {
      setOfThumbs = "";
    }

    let setOfEditButtons = null;
    let muniDeleteModal = null;
    let muniEditModal = null;

    if (muniUser) {
      setOfEditButtons = muniEdit ? (
        <div className={style[styleFactory("replyEditButtons", direction)]}>
          <Button
            mode='secondary'
            title={text["muni-reply.edit"]}
            action={toggleMuniEditModal}
          />
          <Button
            mode='attention'
            title={text["muni-reply.delete"]}
            actionMessage={toggleMuniDeleteConfirmation}
          />
        </div>
      ) : null;
      muniDeleteModal = muniDeleteConfirmation ? (
        <ModalEdit
          direction={direction}
          close={toggleMuniDeleteConfirmation}
          action={submitDeleteMuniReply}
          text={text["muni-reply.delete.text"]}></ModalEdit>
      ) : null;

      muniEditModal = showMuniEditModal ? (
        <ModalEdit
          direction={direction}
          close={toggleMuniEditModal}
          action={submitUpdatePost}
          text={text["muni-reply.edit.text"]}>
          {
            <div className='section'>
              <Field
                direction={direction}
                autoFocus={true}
                type='text'
                name='reply'
                value={post.reply.text}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleReplyChange(event)
                }
                placeholder={text["muni.post.prompt.text"]}
                required
              />
            </div>
          }
        </ModalEdit>
      ) : null;
    }
    ReplyMessage = post.reply.text ? (
      <Reply>
        <InLine
          padding='1rem 1rem 0 1rem'
          direction={direction}
          justify='space-between'>
          <Title direction={direction}>{text["munireply.title"]}</Title>
          <ReplyVotes
            replies={{ up: post.reply.up, down: post.reply.down }}
            direction={direction}
          />
        </InLine>
        <Section direction={direction}>
          <PlainText direction={direction}>{post.reply.text}</PlainText>
          {/* {voted ? <AlreadyPosted>{text["post.voted"]}</AlreadyPosted> : null} */}
          <Spacer space={1} />
        </Section>

        {/* {post.reply.text.length > 50 ? (
          <ShowMore
            color={replyCardColor === "white" ? "primary" : "white"}
            title={showMoreLessText}
            direction={direction}
            opened={replyOpened}
            action={setReplyOpened}
          />
        ) : null} */}
        {setOfEditButtons}
        {muniDeleteModal}
        {muniEditModal}
      </Reply>
    ) : null;
    if (muniUser) setOfThumbs = null;
  }

  // modals
  const deleteConfirmationComponent = deleteConfirmation ? (
    <Confirm
      text={text["post.delete.confirm"]}
      close={toggleDeleteConfirmation}
      action={submitDeletePost}
      direction={direction}
    />
  ) : null;

  newReplyComponent = showNewReply ? (
    <Modal disabled close={toggleShowNewReplyButton}>
      <NewReply
        label={text["newreply.label"]}
        value={post.reply.text}
        placeholder={text["newreply.placeholder"]}
        action={handleReplyChange}
        direction={direction}
        submit={submitUpdatePost}
        submitText={text["login.button.submit"]}
      />
    </Modal>
  ) : null;

  const updateConfirmComponent = updateConfirmation ? (
    <div>
      <Confirm
        text={text["post.update.confirm"]}
        close={toggleCloseSave}
        action={submitUpdatePost}
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
    author || muniUser
      ? {
          right: {
            icon: iconEdit(muniUser ? "secondary" : "primary"),
            action: muniUser ? toggleMuniEdit : toggleEdit,
            noRtl: true
          }
        }
      : null;
  // edit mode
  if (edit || muniEdit)
    editIcon = {
      right: {
        icon: iconClose(muniEdit ? "secondary" : "primary"),
        action: muniEdit ? toggleMuniEdit : toggleCloseSave,
        noRtl: true
      }
    };

  const headerObject = {
    name: location.name[user.settings.language],
    ...editIcon,
    left: { icon: goBack(muniUser ? "secondary" : "primary"), action: goHome }
  };

  const linkToShow = newsLink(post.link, props.news);

  const handleNewsClick = () => {
    const linkElements = post.link.split(":");
    const newsToShow = props.news.filter(
      (el: any) => el._id === linkElements[1]
    );
    props.showPost({ show: true, type: "news", ...newsToShow[0] });
  };

  return (
    <Content>
      <Header {...headerObject} />
      <Spacer space={7} />
      <PostCard>
        <Section direction={direction} padding='0 1rem'>
          <InLine direction={direction} justify='space-between'>
            <Category>{category}</Category>
            {post.reply.text ? (
              <ReplyTag back={secondary70}>{goBack("white")}</ReplyTag>
            ) : null}
          </InLine>
          <Title direction={direction} padding='0 1rem;'>
            {post.title}
          </Title>
          <NumbersLine
            date={post.createdAt}
            daysText={ageText}
            direction={direction}
            votes={post.votes.length}
            voterText={voterText}
          />
        </Section>
        <Photo
          direction={direction}
          src={post.photo}
          edit={edit}
          actions={{ set: handleSetPhoto, remove: handleRemovePhoto }}
          editText={{
            message: text["post.photo.edit"].message,
            confirm: text["post.photo.edit"].confirm,
            cancel: text["post.photo.edit"].cancel,
            label: text["new.field.photo.prompt"],
            placeholder: ""
          }}
        />
        <Link
          primary
          text={linkToShow}
          direction={direction}
          edit={edit}
          actions={{ set: handleSetLink, remove: handleRemoveLink }}
          newsClick={handleNewsClick}
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
            text={post.problem}
            direction={direction}
          />
          {post.solution ? (
            <Text
              back
              title={text["post.solution"]}
              text={post.solution}
              direction={direction}
            />
          ) : null}
        </div>
        <InLine direction={direction} justify='space-between'>
          {voted ? renderVoteButton() : null}
          <ShowMore
            color='primary'
            title={showMoreLessText}
            direction={direction}
            opened={textOpened}
            action={setTextOpened}
          />
        </InLine>
      </PostCard>
      {voted ? null : renderVoteButton()}
      <Spacer space={3} />
      {modal}
      {newReplyButton}
      {newReplyComponent}
      {ReplyMessage}
      {post.reply.text ? setOfThumbs : null}
      {deleteButton}
      {deleteConfirmationComponent}
      {updateConfirmComponent}
      <Spacer space={5} />
    </Content>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    locations: state.locations,
    posts: state.posts,
    news: state.news,
    post: state.post,
    mode: state.mode,
    prevModule: state.prevModule,
    token: state.token,
    auth: state.auth,
    categories: state.categories
  };
};

export default connect(
  mapStateToProps,
  {
    vote,
    updatePost,
    setModule,
    fetchData,
    getPosts,
    deletePost,
    showPost,
    votePost
  }
)(Post);
