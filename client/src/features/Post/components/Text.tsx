import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../../store";

import { ParagraphBlock, ModalEdit } from "./";

import Section from "../../../layout/Section";
import Line from "../../../layout/Line";
import { indexedObjAny } from "../../../store/types";
import styles from "./style/Text.module.scss";
import styleFactory from "../../../modules/style_factory";
import { IconEdit } from "../../../icons";
import TextSubtitle from "../../../styles/post/TextSubtitle";
// import { setPosts } from "../../../store/users/actions";

const iconWrapper = (
  style: string,
  icon: JSX.Element,
  onClick?: () => void
) => (
  <div className={styles[style]} onClick={onClick}>
    {icon}
  </div>
);

const Text = (props: {
  step?: boolean;
  back?: boolean;
  muni?: boolean;
  title?: string;
  text: string;
  direction: string;
  edit?: boolean;
  language: indexedObjAny;
  action?: (arg0: string) => void;
  setAction?: (arg0: string) => void;
}) => {
  const { direction } = props.language;
  const signs = props.language.text;

  const [text, setText] = React.useState(props.text);
  const [showEdit, setShowEdit] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
  };
  const toggleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleYesNo = (mode?: string) => {
    if (mode === "primary") {
      toggleShowModal();
      if (props.action) props.action(text);
    } else {
      toggleShowModal();
      setText(props.text);
    }
  };

  const title = props.title ? (
    <Line flat direction={props.direction}>
      <TextSubtitle>{props.title}</TextSubtitle>
    </Line>
  ) : null;

  const textToShow = (
    <div className={styles[styleFactory("text", direction)]}>{text}</div>
  );

  const modal = showModal ? (
    <ModalEdit
      close={handleYesNo}
      action={handleYesNo}
      text={signs["muni-reply.edit.text"]}>
      {
        <div className={styles.textarea}>
          <textarea
            autoFocus={true}
            name='link'
            value={text}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange(event)
            }
            placeholder={signs["muni.post.prompt.text"]}
            rows={10}
            required
          />
        </div>
      }
    </ModalEdit>
  ) : null;

  const iconEdit = iconWrapper(
    "edit",
    <IconEdit color='secondary' />,
    toggleShowModal
  );
  const sectionEdit = (
    <div className={styles.textEdit}>
      {iconEdit}
      <div className={styles.section}>
        <Section step>{textToShow}</Section>
      </div>
      {modal}
    </div>
  );

  let wrapper: React.ClassicElement<any> = <div />;

  if (props.step) {
    wrapper = (
      <Section step>
        {title}
        {textToShow}
      </Section>
    );
  } else if (props.back) {
    wrapper = (
      <Section back>
        {title}
        {textToShow}
      </Section>
    );
  } else if (props.muni) {
    wrapper = (
      <Section step>
        {title}
        {textToShow}
      </Section>
    );
  }
  if (props.edit) {
    wrapper = sectionEdit;
  }
  return wrapper;
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(Text);
