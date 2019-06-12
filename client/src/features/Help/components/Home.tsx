import React from "react";
import { connect } from "react-redux";

import styleFactory from "../../../modules/style_factory";

import { AppState } from "../../../store";
import { data } from "../../../store/types";

import Button from "../../../components/Button";

import Help from "../../../icons/Help";

import style from "./style/index.module.scss";
import header from "../../../components/styles/Header.module.scss";

const Home = (props: { language: data; cancel: () => void }) => {
  const { direction } = props.language;

  const headerStyle = header[styleFactory("plank", direction)];

  return (
    <div>
      <div className={style.content}>
        <section className={headerStyle}>
          <Button mode='minimal' action={props.cancel}>
            <Help color='white' />
          </Button>
        </section>
        <section className={style.central}>THIS IS GOING TO BE HELP</section>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(Home);
