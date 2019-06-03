import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import { logOff } from "../store/users/actions";
import LangSwitch from '../components/LangSwitch'
import layout from "../styles/_layout.module.scss";
import style from '../styles/Profile.module.scss'

const Profile = (props:any) => {
  return (
    <main className={layout.page}>
      <div>
        <button onClick={()=>props.logOff()}>log off</button>
      </div>
      <div className={style.langSwitch}></div>
      <LangSwitch />
    </main>
  );
};

const mapStateToProps = (state: AppState) => {
  return {};
};

export default connect(
  mapStateToProps,
  { logOff }
)(Profile);
