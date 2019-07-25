import React from "react";

import { IconLink, IconEdit, IconDelete } from "../../../icons";

import styles from "./style/Link.module.scss";
import { ModalEdit } from "./";
import Field from "../../../styles/form/Field";

const iconWrapper = (
  style: string,
  icon: JSX.Element,
  onClick?: () => void
) => (
  <div className={styles[style]} onClick={onClick}>
    {icon}
  </div>
);

export const Link = (props: {
  text: string;
  direction: string;
  preview?: boolean;
  primary?: boolean;
  secondary?: boolean;
  edit?: boolean;
  actions?: { set: (arg0: string) => void; remove: () => void };
  editText?: {
    message: string;
    confirm: string;
    cancel: string;
    label: string;
    placeholder: string;
  };
  newsClick?: () => void;
}) => {
  const [link, setLink] = React.useState(props.text);
  const [showEdit, setShowEdit] = React.useState(false);
  const mainStyle = props.edit ? styles.editing : styles.show;
  const color = props.secondary ? "secondary" : "primary";

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLink(event.target.value);
  };
  const toggleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleYesNo = (mode: string) => {
    if (mode === "primary") {
      if (props.actions) props.actions.set(link);
    }
    toggleShowEdit();
  };

  const handleRemove = () => {
    if (props.actions) props.actions.remove();
  };
  const editText = props.editText
    ? props.editText
    : { message: "Edit the link", confirm: "Save", cancel: "Cancel" };

  const modal = (
    <ModalEdit
      direction={props.direction}
      close={toggleShowEdit}
      action={handleYesNo}
      text={editText}>
      {
        <Field
          medium
          width='75%'
          direction='ltr'
          autoFocus={true}
          type='text'
          name='link'
          value={link}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event)
          }
          placeholder={props.editText ? props.editText.placeholder : ""}
          required
        />
      }
    </ModalEdit>
  );

  const iconDelete = iconWrapper(
    "delete",
    <IconDelete color={color} />,
    handleRemove
  );
  const iconEdit = iconWrapper(
    "edit",
    <IconEdit color={color} />,
    toggleShowEdit
  );

  const openLink = () => {
    const linkItems = props.text.split(":");
    if (props.text && !props.preview && linkItems[0] !== "News") {
      let url = props.text;
      if (props.text.substr(0, 4) !== "http") {
        url = `https://${props.text}`;
      }
      window.open(url, "_blank");
    } else if (linkItems[0] === "News" && props.newsClick) {
      props.newsClick();
    }
  };
  const iconLink = iconWrapper("link", <IconLink color={color} />, openLink);

  return (
    <div className={mainStyle}>
      {iconEdit}
      {props.text ? iconLink : null}
      {props.text ? (
        <div
          className={props.preview ? styles.textPreview : styles.text}
          onClick={() => openLink()}>
          {props.text}
        </div>
      ) : null}
      {iconDelete}
      {showEdit ? modal : null}
    </div>
  );
};
