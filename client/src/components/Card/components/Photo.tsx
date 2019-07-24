import React from "react";
import CardPhoto from "../../../styles/card/Photo";
import imageUrl from "../../../modules/image_url";

const defaultImage = require("../../../assets/image__default.png");

const Photo = (props: { photo: string; children?: JSX.Element | null }) => (
  <CardPhoto image={props.photo ? imageUrl(props.photo) : defaultImage}>
    {props.children ? props.children : null}
  </CardPhoto>
);

export default Photo;
