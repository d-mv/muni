import React from "react";
import { TopBlock, Photo, Link } from "../../Post/components";
import Text from '../../Post/components/Text'
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
}) => {
  const { title, category, problem, solution, photo, link } = props.post;
  const numbersLine = <span />;
  return (
    <div className={style.wrapper}>
      <div data-testid='post__preview' className={style.post}>
        <TopBlock muni title={title} />
        {photo ? <Photo src={photo} edit={false} /> : null}
        <Link primary text={link} direction={props.direction} edit={false} />
        <div className={style.text}>
          <Text
            step
            title={props.text.problem}
            text={problem}
            direction={props.direction}
          />
          {props.muni ? (
            <Text
              back
              title={props.text.solution}
              text={solution||''}
              direction={props.direction}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
