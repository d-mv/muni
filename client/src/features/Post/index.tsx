import React from "react";
import { connect } from "react-redux";

import { categoryIdToName } from "../../modules/category_processor";

import { AppState } from "../../store";
import { indexedObjAny, post, data } from "../../store/types";

import Photo from "./components/Photo";
import Link from "./components/Link";
import Text from "./components/Text";
import TopBlock from "./components/TopBlock";
import ShowMore from "./components/ShowMore";
import NumbersLine from "./components/NumbersLine";

import style from "./style/Post.module.scss";

const Post = (props: {
  post: post;
  language: indexedObjAny;
  location: data;
  preview?: boolean;
  // muni?: boolean;
  edit?: boolean;
}) => {
  const { categories } = props.location;
  const {
    _id,
    title,
    photo,
    link,
    problem,
    solution,
    votes,
    date
  } = props.post;
  const { direction, text, short } = props.language;

  const [textOpened, setTextOpened] = React.useState(false);

  const showStyle = textOpened ? style.text : style.textClosed;
  const voterText =
    votes.length === 1 ? text["post.voter"] : text["post.voters"];
  const category = categoryIdToName(categories, short, props.post.category);
  const showMoreLessText = {
    more: text["post.show-more"],
    less: text["post.show-less"]
  };

  const numbersLine = (
    <NumbersLine
      date={date}
      daysText={[text["post.age.day"], text["post.age.days"]]}
      direction={direction}
      votes={votes.length}
      voterText={voterText}
    />
  );

  return (
    <div data-testid='post__view' id={_id} className={style.post}>
      <TopBlock category={category} title={title} numbersLine={numbersLine} />
      <Photo src={photo} edit={props.edit} />
      <Link primary text={link} direction={direction} edit={props.edit} />
      <div className={showStyle}>
        <Text
          step
          title={text["post.problem"]}
          text={problem}
          direction={direction}
        />
        <Text
          back
          title={text["post.solution"]}
          text={solution}
          direction={direction}
        />
      </div>
      <ShowMore
        title={showMoreLessText}
        direction={direction}
        opened={textOpened}
        action={setTextOpened}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    location: state.locationData
  };
};

export default connect(
  mapStateToProps,
  {}
)(Post);
