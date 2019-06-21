import React from "react";

import Login from "../features/Login";
import Register from "../features/Register";

import LangSwitch from "../components/LangSwitch";

import Page from "../layout/Page";

import style from "./style/Login.module.scss";
import { data } from "../store/types";

/** Functional component to render login/register page
 * @returns {JSX.Element} - Login page
 */
const Enter = (props: { register?: boolean; locations?: data }) => {
  const register = props.locations ? (
    <Register storedLocations={props.locations} />
  ) : (
    <Register />
  );
  const show = props.register ? register : <Login />;
  return (
    <Page opposite>
      {show}
      <div className={style.langSwitch}>
        <LangSwitch />
      </div>
    </Page>
  );
};

export default Enter;
