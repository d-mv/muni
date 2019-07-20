import React from "react";
import CardPhoto from "../../../styles/card/Photo";

const defaultImage = require("../../../assets/image__default.png");

const Photo = (props: { photo: string; children?: JSX.Element | null }) => (
  <CardPhoto image={props.photo ? props.photo : defaultImage}>
    {props.children ? props.children:null}
  </CardPhoto>
);

export default Photo;
