import React from "react";

import Login from "../features/Login";
import Register from "../features/Register";

import LangSwitch from "../components/LangSwitch";

import Page from "../layout/Page";

import style from "./style/Login.module.scss";
import pageStyle from './style/HomeDesktop.module.scss'
import { data } from "../store/types";

/** Functional component to render login/register page
 * @returns {JSX.Element} - Login page
 */
const Enter = (props: { register?: boolean; locations?: data,desktop?:boolean }) => {
  const register = props.locations ? (
    <Register storedLocations={props.locations} />
  ) : (
    <Register />
  );
  const show = props.register ? register : <Login />;
  const content = props.desktop ? (
    <div className={pageStyle.desktop}>
      <Login desktop />
    </div>
  ) : (
    <Page opposite>{show}</Page>
  );
  return content;
};

export default Enter;
