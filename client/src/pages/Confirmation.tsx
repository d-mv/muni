import React from "react";
import { connect } from "react-redux";
import { AppState } from "../store";
import { setModule } from "../store/users/actions";
import Page from "../layout/Page";

import layout from "./style/Confirmation.module.scss";
import Content from "../layout/Content";
import Paragraph from "../layout/Paragraph";
import Button from "../components/Button";
import { data } from "../store/types";

const Confirmation = (props: {
  language: data;
  setModule: (arg0: string) => void;
}) => {
  const { text } = props.language;
  const handleClick = () => {
    props.setModule("login");
  };
  return (
    <Page>
      <div className={layout.wrapper}>
        <p className={layout.centralMessage}>{text["confirmation.message"]}</p>
        <Button mode='primary' action={handleClick}>
          {text["login.button.login"]}
        </Button>
      </div>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language
  };
};

export default connect(
  mapStateToProps,
  {
    setModule
  }
)(Confirmation);
