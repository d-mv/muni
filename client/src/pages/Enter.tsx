import React, { Suspense } from "react";

import Login from "../features/Login";
// import Register from "../features/Register";

import LangSwitch from "../components/LangSwitch";

import Page from "../layout/Page";
import Loading from "./Loading";
import style from "./style/Login.module.scss";
import pageStyle from "./style/HomeDesktop.module.scss";
import { data } from "../store/types";

const Register = React.lazy(() => import("../features/Register"));

/** Functional component to render login/register page
 * @returns {JSX.Element} - Login page
 */
const Enter = (props: {
  register?: boolean;
  locations?: data;
  desktop?: boolean;
}) => {
  const register = (
    <Suspense fallback={<Loading />}>
      <Register />
    </Suspense>
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
