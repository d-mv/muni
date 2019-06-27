import React from "react";

import { IconLink, IconEdit, IconDelete } from "../../../icons";

import styles from "./style/Link.module.scss";
import { ModalEdit } from "./ModalEdit";

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
      toggleShowEdit();
      if (props.actions) props.actions.set(link);
    }
  };

  const handleRemove = () => {
    if (props.actions) props.actions.remove();
  };
  const editText = props.editText
    ? props.editText
    : { message: "Edit the link", confirm: "Save", cancel: "Cancel" };
  const inputText = props.editText
    ? props.editText
    : { label: "Link", placeholder: "enter the link" };

  const modal = (
    <ModalEdit close={toggleShowEdit} action={handleYesNo} text={editText}>
      {
        <div className='section'>
          <input
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
        </div>
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
    let url = props.text;
    if (props.text.substr(0, 4) !== "http") {
      url = `https://${props.text}`;
    }
    window.open(props.text, "_blank");
  };
  const iconLink = iconWrapper("link", <IconLink color={color} />, openLink);
  
  return (
    <div className={mainStyle}>
      {iconEdit}
      {iconLink}
      <div className={styles.text} onClick={() => openLink()}>
        {props.text}
      </div>
      {iconDelete}
      {showEdit ? modal : null}
    </div>
  );
};
