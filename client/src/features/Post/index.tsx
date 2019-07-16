import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { categoryIdToName } from "../../modules/category_processor";
import { replyCardStyleUtil } from "../../modules/reply_style_generator";
import { goBack, iconEdit, iconClose } from "../../icons";

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
  TopBlock,
  ShowMore,
  NumbersLine,
  NewReply,
  Voted,
  SetOfThumbs,
  ReplyVotes,
  NewReplyButton,
  ModalView,
  Confirm,
  ModalEdit
} from "./components";
import Text from "./components/Text";

import style from "./style/Post.module.scss";
import styleFactory from "../../modules/style_factory";
import Button from "../../components/Button";
import { AuthState } from "../../models";
import { emptyPost } from "../../store/defaults";
import logger from "../../modules/logger";
import { ReplyTag } from "./components/ReplyTag";

const Post = (props: {
  posts: any;
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
    setShowConfirm(!showConfirm);
    setTimeout(() => {
      setShowConfirm(!showConfirm);
    }, 2000);
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
    props.updatePost({ ...post, reply });
  };

  // numbers line
  const ageText: { [index: string]: string } = text["post.age"];
  const numbersLine = (
    <NumbersLine
      date={post.createdAt}
      daysText={ageText}
      direction={direction}
      votes={post.votes.length}
      voterText={voterText}
    />
  );

  // setting up components
  const modal = showConfirm ? (
    <ModalView close={submitVote} text={text["vote.thanks"]} />
  ) : null;

  let voteButton =
    includes || author || muniUser ? null : (
      <div className={style.voteButton} onClick={() => submitVote()}>
        <VoteButton />
      </div>
    );

  if (post.votes.includes(props.auth.user._id))
    voteButton = <Voted text={text["post.voted"]} direction={direction} />;

  let newReplyComponent: any = "";
  let ReplyMessage: any = "";
  let setOfThumbs: any = "";

  const newReplyButton =
    muniUser && !post.reply.text ? (
      <NewReplyButton action={toggleShowNewReplyButton} />
    ) : null;

  // if there is muni reply
  if (post.reply) {
    const { replyCardStyle, replyCardColor } = replyCardStyleUtil(
      post.reply,
      replyOpened
    );

    if (post.reply.text && !allowToReply) {
      setOfThumbs = (
        <div className={style[styleFactory("thumbsContainer", direction)]}>
          <div onClick={(event: any) => handleReplyVoting(true)}>⬆</div>
          <div onClick={(event: any) => handleReplyVoting(false)}>⬇</div>
        </div>
      );
    } else if (allowToReply) {
      setOfThumbs = <Voted text={text["post.voted"]} direction={direction} />;
    }

    const replyVotes = (
      <ReplyVotes replies={{ up: post.reply.up, down: post.reply.down }} />
    );
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
          close={toggleMuniDeleteConfirmation}
          action={submitDeleteMuniReply}
          text={text["muni-reply.delete.text"]}></ModalEdit>
      ) : null;

      muniEditModal = showMuniEditModal ? (
        <ModalEdit
          close={toggleMuniEditModal}
          action={submitUpdatePost}
          text={text["muni-reply.edit.text"]}>
          {
            <div className='section'>
              <input
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
      <div ref={replyRef} id='replyRef' className={style[replyCardStyle]}>
        <div className={style[styleFactory("replyTitleLine", direction)]}>
          {replyVotes}
          <span className={style.replyCardTitle}>
            {text["munireply.title"]}
          </span>
        </div>
        <div className={style.replyMessage}>{post.reply.text}</div>
        {post.reply.text.length > 50 ? (
          <ShowMore
            color={replyCardColor === "white" ? "primary" : "white"}
            title={showMoreLessText}
            direction={direction}
            opened={replyOpened}
            action={setReplyOpened}
          />
        ) : null}
        {setOfEditButtons}
        {muniDeleteModal}
        {muniEditModal}
      </div>
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

  return (
    <div className={style.container}>
      <Header {...headerObject} />
      <div className={style.wrapper}>
        <div data-testid='post__view' id={post._id} className={style.post}>
          {post.reply.text ? (
            <ReplyTag text='reply'/>
          ) : null}
          <TopBlock
            category={category}
            title={post.title}
            numbersLine={numbersLine}
          />
          <Photo
            src={post.photo}
            edit={edit}
            actions={{ set: handleSetPhoto, remove: handleRemovePhoto }}
          />
          <Link
            primary
            text={post.link}
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
        {post.reply.text ? (
          <div className={style.replyVoted}>{setOfThumbs}</div>
        ) : null}
        {deleteButton}
        {deleteConfirmationComponent}
        {updateConfirmComponent}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    locations: state.locations,
    posts: state.posts,
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
