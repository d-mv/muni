import { AppState } from "../store";
import React from "react";
import { connect } from "react-redux";
import { setLanguage } from "../store/users/actions";
import { data, indexedObjAny } from "../store/types";

const LangSwitch = (props: {
  language: indexedObjAny;
  data: indexedObjAny;
  user: string;
  setLanguage: (arg0: string, arg1: string) => void;
}) => {
  return (
    <select
      className='langSwitch'
      value={props.language.short}
      onChange={e => props.setLanguage(e.target.value, props.user)}>
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
    user: state.locationData._id
  };
};

export default connect(
  mapStateToProps,
  { setLanguage }
)(LangSwitch);
