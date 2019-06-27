import React from "react";
import { connect } from "react-redux";

import styleFactory from "../../../modules/style_factory";

import { AppState } from "../../../store";
import { data } from "../../../store/types";

import Button from "../../../components/Button";
import { iconHelp } from "../../../icons";
import style from "./style/index.module.scss";
import header from "../../../components/style/Header.module.scss";
import Title from "../../../components/Title";

const Home = (props: { language: data; cancel: () => void,type:any }) => {
  const { direction, text } = props.language;

  const headerStyle = style[styleFactory("header", direction)];
  const headerDescStyle = style[styleFactory("headerDesc", direction)];
  const titleStyle = style[styleFactory("title", direction)];

  return (
    <div className={style.content}>
      <section className={headerStyle}>
        <Button mode='minimal' action={props.cancel}>
          {iconHelp("white")}
        </Button>
        <div className={titleStyle}>{text["help.mycity"]}</div>
        <Button mode='minimal'></Button>
      </section>
      <section className={headerDescStyle}>
        <div>{text["help.button.help"]}</div>
      </section>
      <section className={style.pinned}>
        <div>{text["help.post.pinned"]}</div>
      </section>
      <section className={style.card}>
        <div className={style.photo}>{text["help.post.photo"]}</div>
        <div className={style.category}>{text["help.post.category"]}</div>
        <div className={style.title}>{text["help.post.title"]}</div>
        <div className={style.lineThree}>{text["help.post.age"]}</div>
      </section>
      <section>
        <div className={style.voteButtonText}>
          {text[props.type === "muni" ? "help.new.muni" : "help.new"]}
        </div>
      </section>
      <section>
        <div className={style.navLeft}>{text["help.navigation"]}</div>
        <div className={style.navRight}>{text["help.navigation"]}</div>
      </section>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    type:state.type
  };
};

export default connect(
  mapStateToProps,
  {}
)(Home);
