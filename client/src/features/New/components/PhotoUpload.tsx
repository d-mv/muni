import React from "react";

import { imageDecoder, imageEncoder } from "../../../modules/image_coder";

import Photo from "../../../icons/Photo";
import Block from "../../../layout/Block";
import Center from "../../../layout/Center";
import style from "./styles/PhotoUpload.module.scss";
import Line from "../../../layout/Line";
import ButtonsWrapper from "../../../layout/ButtonsWrapper";
import button from "../../../components/styles/Button.module.scss";

const PhotoUpload = (props: {
  label: string;
  direction: string;
  action: (arg0: any) => void;
}) => {
  const defaultPhoto =
    "https://res.cloudinary.com/diciu4xpu/image/upload/v1560088174/dev/photo.svg";
  const [photo, setPhoto] = React.useState("");

  /**
   * Function to convert file to base64, send it to props,set local URL as preview
   * @params {Array} files - File selected by client
   */
  const getBaseFile = (event: any) => {
    imageEncoder(event.target.files[0], (image64: any) => {
      const image = imageDecoder(image64);
      setPhoto(image);
      console.log(image64);
      props.action(image64);
    });
  };

  const showPhoto = photo ? (
    <img src={photo} alt='upload-image' className={style.image} />
  ) : (
    <img src={defaultPhoto} alt='upload-image' className={style.imageDef} />
  );

  return (
    <Block border>
      {showPhoto}
      <input
        id='file'
        type='file'
        name='file'
        className={style.input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => getBaseFile(e)}
        // onDone={(e: any) => getBaseFile(e)}
      />
      <label htmlFor='file' className={button.primarySmall}>
        {props.label}
      </label>
    </Block>
  );
};

export default PhotoUpload;
