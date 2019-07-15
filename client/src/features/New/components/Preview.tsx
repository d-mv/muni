import React from "react";
import { TopBlock, Photo, Link } from "../../Post/components";
import Text from "../../Post/components/Text";
import style from "../../Post/style/Post.module.scss";

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
  text: { problem: string; solution: string };
  muni?: boolean;
}) => (
  <div className={style.wrapper}>
    <div data-testid='post__preview' className={style.post}>
      <TopBlock title={props.post.title} category={props.post.category} />
      {props.post.photo ? <Photo src={props.post.photo} edit={false} /> : null}
      <Link
        primary
        text={props.post.link}
        direction={props.direction}
        edit={false}
      />
      <div className={style.text}>
        <Text
          step
          title={props.text.problem}
          text={props.post.problem}
          direction={props.direction}
        />
          {props.muni || !props.post.solution ? null : (
          <Text
            back
            title={props.text.solution}
            text={props.post.solution || ""}
            direction={props.direction}
          />
        )}
      </div>
    </div>
  </div>
)
