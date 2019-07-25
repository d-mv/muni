import React, { useState } from "react";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { setModule } from "../../store/users/actions";
import {
  getNews,
  updateNews,
  showPost,
  deleteNews
} from "../../store/post/actions";
import { indexedObjAny } from "../../store/types";

import { Photo, Link, Confirm, NumbersLine } from "./components";
import Text from "./components/Text";

import Block from "../../layout/Block";

import PostCard from "../../styles/Post";
import Content from "../../styles/Content";
import Header from "../../components/Header";
import { goBack, iconEdit, iconClose } from "../../icons";
import Button from "../../components/Button";
import { AuthState } from "../../models";
import Section from "../../styles/Section";
import Title from "../../styles/common/Title";
import Spacer from "../../styles/utils/Spacer";
import InLine from "../../styles/utils/InLine";
import { emptyPost } from "../../store/defaults";

const PostMuni = (props: {
  auth: AuthState;
  post: any;
  news: any;
  language: indexedObjAny;
  locations: indexedObjAny;
  setModule: (arg0: string) => void;
  getNews: (arg0: string) => void;
  updateNews: (arg0: any) => void;
  showPost: (arg0: any) => void;
  deleteNews: (arg0: string) => void;
  prevModule: string;
}) => {
  const { direction, text } = props.language;
  const { user } = props.auth;
  const location = props.locations.filter(
    (el: any) => el._id === user.location
  )[0];

  const originalPost = props.news.filter(
    (post: any) => post._id === props.post._id
  )[0];

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [updateConfirmation, showUpdateConfirmation] = useState(false);

  const [muniEdit, setMuniEdit] = useState(false);

  // !
  const muniUser = user.type === "muni";

  const toggleMuniEdit = () => {
    setMuniEdit(!muniEdit);
  };
  const toggleDeleteConfirmation = () => {
    setDeleteConfirmation(!deleteConfirmation);
  };
  const toggleCloseSave = () => {
    showUpdateConfirmation(!updateConfirmation);
  };

  const goHome = () => {
    props.showPost({ show: false, ...emptyPost });
    props.setModule(props.prevModule);
  };

  const handleUpdate = (answer: string) => {
    if (answer === "attention") {
      props.showPost(originalPost);
    } else {
      props.updateNews(props.post);
    }
    setMuniEdit(false);
    showUpdateConfirmation(false);
  };

  const handleDelete = (mode: string) => {
    if (mode === "primary") {
      props.deleteNews(props.post._id);
      goHome();
    }
  };
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
  const handleSetText = (text: string) => {
    props.showPost({ text });
  };

  const deleteButton = muniEdit ? (
    <InLine
      direction={direction}
      justify='center'
      width='100%'
      padding='2rem 0'>
      <Button mode='attention' onClick={toggleDeleteConfirmation}>
        {text["post.delete.button"]}
      </Button>
    </InLine>
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

  const deleteConfirmationComponent = deleteConfirmation ? (
    <Confirm
      text={text["post.delete.confirm"]}
      close={toggleDeleteConfirmation}
      action={handleDelete}
      direction={direction}
    />
  ) : null;
  const ageText: { [index: string]: string } = text["post.age"];

  // header
  let editIcon = muniUser
    ? {
        right: {
          icon: iconEdit("secondary"),
          action: toggleMuniEdit,
          noRtl: true
        }
      }
    : null;
  // edit mode
  if (muniEdit)
    editIcon = {
      right: {
        icon: iconClose("secondary"),
        action: toggleCloseSave,
        noRtl: true
      }
    };

  const headerObject = {
    name: location.name[user.settings.language],
    ...editIcon,
    left: { icon: goBack(muniUser ? "secondary" : "primary"), action: goHome }
  };
  return (
    <Content>
      <Header {...headerObject} />
      <Spacer space={7} />
      <PostCard>
        <Section direction={direction} padding='0 1rem'>
          <Spacer space={1} />
          <Title direction={direction} padding='0 1rem;'>
            {props.post.title}
          </Title>
          <NumbersLine
            date={props.post.createdAt}
            daysText={ageText}
            direction={direction}
          />
        </Section>
        <Photo
          src={props.post.photo}
          edit={muniEdit}
          actions={{ set: handleSetPhoto, remove: handleRemovePhoto }}
        />
        <Block>
          <Link
            primary
            text={props.post.link}
            direction={direction}
            edit={muniEdit}
            actions={{ set: handleSetLink, remove: handleRemoveLink }}
            editText={{
              message: text["post.link.edit"],
              confirm: text["confirm"],
              cancel: text["cancel"],
              label: text["new.field.link.label"],
              placeholder: text["new.field.link.prompt"]
            }}
          />
        </Block>
        <Text
          muni
          text={props.post.text}
          direction={direction}
          edit={muniEdit}
          action={handleSetText}
        />
      </PostCard>
      {deleteButton}
      {deleteConfirmationComponent}
      {updateConfirmComponent}
    </Content>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    auth: state.auth,
    language: state.language,
    locations: state.locations,
    prevModule: state.prevModule,
    post: state.post,
    news: state.news
  };
};

export default connect(
  mapStateToProps,
  { setModule, getNews, updateNews, showPost, deleteNews }
)(PostMuni);
