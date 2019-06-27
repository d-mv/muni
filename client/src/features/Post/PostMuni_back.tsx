import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { setModule } from "../../store/users/actions";
import { indexedObjAny } from "../../store/types";

import { Photo, Link } from "./components";
import Text from "./components/Text";

import Block from "../../layout/Block";

import style from "./style/Post.module.scss";
import Content from "../../layout/Content";
import Header from "../../components/Header";
import { goBack } from "../../icons";

const PostMuni = (props: {
  post: any;
  language: indexedObjAny;
  location: indexedObjAny;
  setModule: (arg0: string) => void;
  prevModule: string;
}) => {
  const { post } = props;
  const { direction } = props.language;

  const goHome = () => {
    props.setModule(props.prevModule);
  };
  const headerObject = {
    name: props.location.name[props.language.short],
    left: { icon: goBack("primary"), action: goHome }
  };

  return (
    <Content header>
      <Header {...headerObject} />
      <div className={style.wrapper}>
        <div data-testid='post__view' id={post._id} className={style.post}>
          <Photo src={post.photo} />
          <Block>
            <Link primary text={post.link} direction={direction} />
          </Block>
          <Text muni text={post.text} direction={direction} />
        </div>
      </div>
    </Content>
  );

  // <Content header>
  //   <Header {...headerObject} />
  //   <div className={style.wrapper}>
  //     <div data-testid='post__view' id={_id} className={style.post}>
  //       <TopBlock
  //         category={category}
  //         title={title}
  //         numbersLine={numbersLine}
  //       />
  //       <Photo src={photo} edit={mockEdit} />
  //       <Link primary text={link} direction={direction} edit={mockEdit} />
  //       <div className={showStyle}>
  //         <Text
  //           step
  //           title={text["post.problem"]}
  //           text={problem}
  //           direction={direction}
  //         />
  //         <Text
  //           back
  //           title={text["post.solution"]}
  //           text={solution}
  //           direction={direction}
  //         />
  //       </div>
  //       <ShowMore
  //         color='primary'
  //         title={showMoreLessText}
  //         direction={direction}
  //         opened={textOpened}
  //         action={setTextOpened}
  //       />
  //     </div>
  //     <div className={style.voted}>{voteButton}</div>
  //     {modal}
  //     {newReplyButton}
  //     {newReplyComponent}
  //     {ReplyMessage}
  //     {setOfThumbs}
  //   </div>
  // </Content>;
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    location: state.locationData,
    prevModule: state.prevModule,
    post: state.locationData.municipality.filter(
      // @ts-ignore
      (post: any) => post._id === state.post._id
    )[0]
  };
};

export default connect(
  mapStateToProps,
  { setModule }
)(PostMuni);
