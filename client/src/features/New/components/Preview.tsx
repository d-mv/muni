import React from "react";
import { TopBlock, Photo, Link, Text } from "../../Post/components";
import style from "../../Post/style/Post.module.scss";

export const Preview = (props: {
  post: {
    title: string;
    category: string;
    problem: string;
    solution: string;
    photo: string;
    link: string;
  };
  direction: string;
  text: { problem: string; solution: string };
}) => {
  const { title, category, problem, solution, photo, link } = props.post;
  const numbersLine = <span />;
  return (
    <div className={style.wrapper}>
      <div data-testid='post__preview' className={style.post}>
        <TopBlock category={category} title={title} numbersLine={numbersLine} />
        {photo ? <Photo src={photo} edit={false} /> : null}
        <Link primary text={link} direction={props.direction} edit={false} />
        <div className={style.text}>
          <Text
            step
            title={props.text.problem}
            text={problem}
            direction={props.direction}
          />
          <Text
            back
            title={props.text.solution}
            text={solution}
            direction={props.direction}
          />
        </div>
      </div>
    </div>
  );
};
