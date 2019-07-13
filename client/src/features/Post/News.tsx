import React, { useState } from "react";
import { connect } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { AppState } from "../../store";
import { setModule } from "../../store/users/actions";
import { getNews } from "../../store/post/actions";
import { indexedObjAny } from "../../store/types";

import { Photo, Link, Confirm, TopBlock, NumbersLine } from "./components";
import Text from "./components/Text";

import Block from "../../layout/Block";

import style from "./style/Post.module.scss";
import Content from "../../layout/Content";
import Header from "../../components/Header";
import { goBack, iconEdit, iconClose } from "../../icons";
import Button from "../../components/Button";
import { AuthState, NewsType } from "../../models";

const PostMuni = (props: {
  auth: AuthState;
  post: NewsType;
  language: indexedObjAny;
  locations: indexedObjAny;
  setModule: (arg0: string) => void;
  getNews: (arg0: string) => void;
  prevModule: string;
}) => {
  const { direction, text } = props.language;
  const { user } = props.auth;
  const location = props.locations.filter(
    (el: any) => el._id === user.location
  )[0];

  const [post, setPost] = useState(props.post);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [updateConfirmation, showUpdateConfirmation] = useState(false);

  const [muniEdit, setMuniEdit] = useState(false);

  // !
  const muniUser = user.type === "muni";
  console.log(post.title);
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
    props.setModule(props.prevModule);
  };

  const handleEdits = (editedText: string) => {
    setPost({ ...post, text: editedText });
  };

  const handleUpdate = (answer: string) => {
    // console.log(answer);
    if (answer === "attention") {
      toggleMuniEdit();
      setPost(props.post);
      toggleCloseSave();
    } else {
      const url = `/muni/${user.location}`;
      axios
        .patch(url, { ...post })
        .then((response: AxiosResponse<any>) => {
          toggleMuniEdit();
          props.getNews(user.location);
        })
        .catch((reason: any) => {
          console.log(reason);
        });
    }
  };

  const handleDelete = (mode: string) => {
    if (mode === "secondary") {
      const url = `/muni/${user.location}`;
      axios
        .put(url, { post: post._id })
        .then((response: AxiosResponse<any>) => {
          toggleMuniEdit();
          props.getNews(user.location);
        })
        .catch((reason: any) => {
          console.log(reason);
        });
    }
  };
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
  const handleSetText = (text: string) => {
    setPost({ ...post, text });
  };

  const deleteButton = muniEdit ? (
    <div className={style.deleteButton}>
      <Button mode='attention' action={toggleDeleteConfirmation}>
        {text["post.delete.button"]}
      </Button>
    </div>
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

  const numbersLine = (
    <NumbersLine
      date={post.createdAt}
      daysText={ageText}
      direction={direction}
    />
  );

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
  console.log(location);
  return (
    <Content header>
      <Header {...headerObject} />
      <div className={style.wrapper}>
        <div data-testid='post__view' id={post._id} className={style.post}>
          <TopBlock muni title={post.title} numbersLine={numbersLine} />
          <Photo
            src={post.photo}
            edit={muniEdit}
            actions={{ set: handleSetPhoto, remove: handleRemovePhoto }}
          />
          <Block>
            <Link
              primary
              text={post.link}
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
            text={post.text}
            direction={direction}
            edit={muniEdit}
            action={handleSetText}
            // setAction={handleUpdate}
          />
        </div>
      </div>
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
    post: state.news.filter(
      // @ts-ignore
      (post: NewsType) => post._id === state.post._id
    )[0]
  };
};

export default connect(
  mapStateToProps,
  { setModule, getNews }
)(PostMuni);
