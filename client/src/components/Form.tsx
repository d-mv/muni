import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { indexedObj, indexedObjAny } from "../store/types";

import style from "./styles/Form.module.scss";

const Form = (props: {
  language: indexedObjAny;
  action: (arg0: React.FormEvent<HTMLElement>) => void;
  children: any;
}) => {
  const { direction } = props.language;
  return (
    <form
      className={direction === "rtl" ? style.right : style.left}
      onSubmit={(event: React.FormEvent<HTMLElement>) => props.action(event)}>
      {props.children}
    </form>
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
)(Form);
