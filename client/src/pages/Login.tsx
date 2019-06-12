import React from "react";

import LoginUser from "../features/Login";
import Page from "../layout/Page";
import LangSwitch from "../components/LangSwitch";

import style from "./style/Login.module.scss";

/** Functional component to render login/register page
 *
 * @returns {JSX.Element} - Login page
 */
const Login = () => {
  return (
    <Page opposite>
      <LoginUser />
      <div className={style.langSwitch}>
        <LangSwitch />
      </div>
    </Page>
  );
};

export default Login;
