import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import { logOff } from "../store/users/actions";
import layout from "../styles/_layout.module.scss";

const Profile = (props:any) => {
  return (
    <main className={layout.page}>
      <div>
        <button onClick={()=>props.logOff()}>log off</button>
      </div>
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
