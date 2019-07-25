import React, { Suspense } from "react";

import Login from "../features/Login";

import Loading from "./Loading";
import { data } from "../store/types";
import { PageOpposite, PageDesktop } from "../styles/Page";

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
    <PageDesktop>
      <Login desktop />
    </PageDesktop>
  ) : (
    <PageOpposite>{show}</PageOpposite>
  );
  return content;
};

export default Enter;
