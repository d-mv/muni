import React from "react";
import { Photo, Link } from "../../Post/components";
import Text from "../../Post/components/Text";
import style from "../../Post/style/Post.module.scss";
import Section from "../../../styles/Section";
import Title from "../../../styles/common/Title";
import Post from "../../../styles/Post";

export const Preview = (props: {
  post: {
    title: string;
    category?: string;
    problem: string;
    solution?: string;
    photo: string;
    link: string;
  };
  direction: string;
  text?: { problem: string; solution?: string };
  muni?: boolean;
}) => (
  <Post>
    <Section direction={props.direction} padding='0 1rem'>
      <Title direction={props.direction} padding='1rem 0'>
        {props.post.title}
      </Title>
    </Section>
    {props.post.photo ? <Photo src={props.post.photo} edit={false} /> : null}
    {props.post.link ? (
      <Link
        primary
        text={props.post.link}
        direction={props.direction}
        edit={false}
      />
    ) : null}
    <div className={style.text}>
      <Text
        step
        title={
          props.muni && !props.text ? "" : props.text ? props.text.problem : ""
        }
        text={props.post.problem}
        direction={props.direction}
      />
      {props.muni || !props.post.solution ? null : (
        <Text
          back
          title={props.text ? props.text.solution : ""}
          text={props.post.solution || ""}
          direction={props.direction}
        />
      )}
    </div>
  </Post>
);
