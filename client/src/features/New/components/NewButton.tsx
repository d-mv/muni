import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../store";

import { iconCreateNew } from "../../../icons";
import {add} from '../../../icons/add'

import style from "./styles/NewButton.module.scss";

const NewButton = (props: { action: () => void,type:any }) => {
const icon = props.type === "muni" ? add("white") : iconCreateNew;
  return (
    <button className={style.new} onClick={() => props.action()}>
      {icon}
    </button>
  );
};



const mapStateToProps = (state: AppState) => {
  return {
    type: state.type
  };
};

export default connect(
  mapStateToProps,
  {}
)(NewButton);
