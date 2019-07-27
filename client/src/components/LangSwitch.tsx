import { AppState } from "../store";
import React from "react";
import { connect } from "react-redux";
import { setLanguage } from "../store/users/actions";
import { data, indexedObjAny } from "../store/types";
import LanguageSwitch from "../styles/LanguageSwitch";

const LangSwitch = (props: {
  language: indexedObjAny;
  data: indexedObjAny;
  user: data;
  setLanguage: (arg0: string, arg1: string) => void;
  white?: boolean;
}) => (
  <LanguageSwitch
    white={props.white}
    short={props.language.short.length === 1}
    value={props.language.short}
    onChange={e => props.setLanguage("user", e.target.value)}>
    {Object.keys(props.data.language).map((lang: string) => (
      <option key={lang}>{lang}</option>
    ))}
  </LanguageSwitch>
);

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
