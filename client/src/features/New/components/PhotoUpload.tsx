import React from "react";
import Photo from "../../../icons/Photo";
import Block from "../../../layout/Block";
import Center from "../../../layout/Center";
import style from "./styles/PhotoUpload.module.scss";
import Line from "../../../layout/Line";
import ButtonsWrapper from "../../../layout/ButtonsWrapper";
import button from '../../../components/styles/Button.module.scss'

const PhotoUpload = (props: { label: string; direction: string }) => {
  const defaultPhoto =
    "https://res.cloudinary.com/diciu4xpu/image/upload/v1560088174/dev/photo.svg";
  const [photo, setPhoto] = React.useState("");
  const uploadImage = (e: any) => {
    let imageObj = {};

    let imageFormObj = new FormData();

    imageFormObj.append("imageName", "multer-image-" + Date.now());
    imageFormObj.append("imageData", e.target.files[0]);

    // stores a readable instance of
    // the image being uploaded using multer
    if (e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  // setInterval(() => {
  //   const ided = document.getElementById("input") || null
  //   if (ided) {console.log(ided.style)}
  // }, 1000);
  const showPhoto = photo ? (
    <img src={photo} alt='upload-image' className={style.image} />
  ) : (
    <img src={defaultPhoto} alt='upload-image' className={style.imageDef} />
  );

  // var inputs = document.querySelectorAll( '.inputfile' );
  // Array.prototype.forEach.call( inputs, function( input )
  // {
  // 	var label	 = input.nextElementSibling,
  // 		labelVal = label.innerHTML;

  // 	input.addEventListener( 'change', function( e )
  // 	{
  // 		var fileName = '';
  // 		if( this.files && this.files.length > 1 )
  // 			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
  // 		else
  // 			fileName = e.target.value.split( '\' ).pop();

  // 		if( fileName )
  // 			label.querySelector( 'span' ).innerHTML = fileName;
  // 		else
  // 			label.innerHTML = labelVal;
  // 	});
  // });

  return (
    <Block border>
      {showPhoto}
      <input
        id='file'
        type='file'
        name='file'
        className={style.input}
        onChange={e => uploadImage(e)}
      />
      <label htmlFor='file' className={button.primarySmall}>
        {props.label}
      </label>
    </Block>
  );
};

export default PhotoUpload;
