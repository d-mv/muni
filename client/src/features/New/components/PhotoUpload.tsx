import React from "react";
import { imageDecoder, imageEncoder } from "../../../modules/image_coder";

import PostPhoto from "../../../styles/post/Photo";

import style from "./style/PhotoUpload.module.scss";
import Frame from "../../../styles/post/Frame";

const PhotoUpload = (props: {
  label: string;
  direction: string;
  action: (arg0: any) => void;
  photo?: string;
}) => {
  const [photo, setPhoto] = React.useState(props.photo ? props.photo : null);

  /**
   * Function to convert file to base64, send it to props,set local URL as preview
   * @params {Array} files - File selected by client
   */
  const getBaseFile = (event: any) => {
    imageEncoder(event.target.files[0], (image64: any) => {
      const image = imageDecoder(image64);
      setPhoto(image);
      props.action(image64);
    });
  };

  const defaultPhoto = require("../../../assets/image__default.png");

  return (
    <Frame id='post__frame_new-photo' width='auto'>
      <PostPhoto id='post__new-photo' image={photo ? photo : defaultPhoto} />
      <input
        id='file'
        type='file'
        name='file'
        className={style.input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => getBaseFile(e)}
      />
      <label htmlFor='file' className='buttonSemiPrimary'>
        {props.label}
      </label>
    </Frame>
  );
};

export default PhotoUpload;
