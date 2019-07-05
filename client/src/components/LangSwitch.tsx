import { AppState } from "../store";
import React from "react";
import { connect } from "react-redux";
import { setLanguage } from "../store/users/actions";
import { data, indexedObjAny } from "../store/types";

const LangSwitch = (props: {
  language: indexedObjAny;
  data: indexedObjAny;
  user: data;
  setLanguage: (arg0: string, arg1: string) => void;
  white?:boolean
}) => {
  return (
    <select
      className={props.white?'langSwitchWhite':'langSwitch'}
      value={props.language.short}
      onChange={e => props.setLanguage(e.target.value, props.user._id)}>
      {Object.keys(props.data.language).map((lang: string) => (
        <option key={lang}>{lang}</option>
      ))}
    </select>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    data: state.data,
    user: state.auth
  };
};

export default connect(
  mapStateToProps,
  { setLanguage }
)(LangSwitch);
