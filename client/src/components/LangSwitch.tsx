import { AppState } from "../store";
import React from "react";
import { connect } from "react-redux";
import { setLanguage } from "../store/app/actions";
import style from "./styles/LangSwitch.module.scss";

const LangSwitch = (props: any) => {
  // const [selectedLanguage, setSelectedLanguage] = React.useState('en')

  return (
    <select
      className={style.select}
      value={props.language.short}
      onChange={e => props.setLanguage(e.target.value)}>
      {Object.keys(props.data.language).map((lang: string) => (
        <option key={lang}>{lang}</option>
      ))}
    </select>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    data: state.data
  };
};

export default connect(
  mapStateToProps,
  { setLanguage }
)(LangSwitch);
