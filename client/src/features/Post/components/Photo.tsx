import React from "react";

import PostPhoto from "../../../styles/post/Photo";
import styles from "./style/Photo.module.scss";
import { IconEdit, IconDelete } from "../../../icons";
import { ModalEdit } from ".";
import { imageEncoder, imageDecoder } from "../../../modules/image_coder";
import imageUrl from "../../../modules/image_url";
import Frame from "../../../styles/post/Frame";

const iconWrapper = (
  style: string,
  icon: JSX.Element,
  onClick?: () => void
) => (
  <div className={styles[style]} onClick={onClick}>
    {icon}
  </div>
);

export const Photo = (props: {
  direction?: string;
  src: string;
  preview?: boolean;
  edit?: boolean;
  primary?: boolean;
  secondary?: boolean;
  actions?: { set: (arg0: string) => void; remove: () => void };
  editText?: {
    message: string;
    confirm: string;
    cancel: string;
    label: string;
    placeholder: string;
  };
}) => {
  const [graphic, setGraphic] = React.useState(props.src);
  const [image64, setImage64] = React.useState();
  const [showEdit, setShowEdit] = React.useState(false);

  const mainStyle = props.edit ? styles.editing : styles.show;
  const color = props.secondary ? "secondary" : "primary";

  const defaultPhoto = require("../../../assets/image__default.png");

  /**
   * Function to convert file to base64, send it to props,set local URL as preview
   * @params {Array} files - File selected by client
   */
  const getBaseFile = (event: any) => {
    imageEncoder(event.target.files[0], (image64: any) => {
      const image = imageDecoder(image64);
      setGraphic(image);
      setImage64(image64);
    });
  };

  const toggleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleYesNo = (mode: string) => {
    if (mode === "primary") {
      if (props.actions) props.actions.set(image64);
    }
    setGraphic("");
    toggleShowEdit();
  };

  const handleRemove = () => {
    setGraphic("");
    if (props.actions) props.actions.remove();
  };

  const editText = props.editText
    ? props.editText
    : { message: "Choose new photo", confirm: "Save", cancel: "Cancel" };
  const inputText = props.editText ? props.editText : { label: "Add photo" };

  const modal = (
    <ModalEdit
      direction={props.direction ? props.direction : "ltr"}
      close={toggleShowEdit}
      action={handleYesNo}
      text={editText}>
      <Frame id='post__frame_modal-edit-photo'>
        <PostPhoto
          id='post__modal-edit-photo'
          image={graphic ? graphic : defaultPhoto}
        />
        <input
          id='file'
          type='file'
          name='file'
          className={styles.input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => getBaseFile(e)}
        />
        <label htmlFor='file' className='buttonSemiPrimary'>
          {inputText.label}
        </label>
      </Frame>
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

  let image: any = defaultPhoto;
  if (props.src) image = imageUrl(props.src);
  if (graphic) image = graphic;

  return (
    <div className={mainStyle}>
      {iconEdit}
      <PostPhoto image={image} />
      <div className={styles.circle}>{iconDelete}</div>
      {showEdit ? modal : null}
    </div>
  );
};
