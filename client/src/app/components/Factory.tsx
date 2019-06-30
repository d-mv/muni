import React, { Suspense } from "react";

import Loading from "../../pages/Loading";
import WelcomePage from "../../pages/Welcome";
import LoginPage from "../../pages/Enter";
import RegisterPage from "../../pages/Enter";
import MunicipalityPage from "../../pages/Municipality";
import NewPage from "../../pages/New";
import PostPage from "../../pages/Post";
import HomePage from "../../pages/Home";
import MinePage from "../../pages/Mine";
import ProfilePage from "../../pages/Profile";

import Navigation from "../../features/Navigation";
import NewButton from "../../features/New/components/NewButton";
import { data } from "../../store/types";

const AppComponent = (props: { children: any; userMuni: boolean }) => (
  <div className={props.userMuni ? "appMuni" : "app"}>{props.children}</div>
);

const LazyComponent = (props: { children: any }) => (
  <Suspense fallback={<Loading />}>{props.children}</Suspense>
);

const componentFactory = (props: {
  children: any;
  lazy?: boolean;
  nav?: boolean;
  new?: boolean;
  config: { action: () => void; user: boolean };
}) => {
  // navigation ?
  const nav = props.nav ? <Navigation /> : null;
  // new button ?
  const newButton = props.new ? <NewButton config={props.config} /> : null;
  // lazy load?
  const children = props.lazy ? (
    <LazyComponent>{props.children}</LazyComponent>
  ) : (
    props.children
  );
  // form content
  const content = (
    <AppComponent userMuni={props.config.user}>
      {nav}
      {newButton}
      {children}
    </AppComponent>
  );
  return content;
};

export const Confirmation = (props: {
  config: { action: () => void; user: boolean };
}) =>
  componentFactory({
    children: React.lazy(() => import("../../pages/Confirmation")),
    nav: true,
    lazy: true,
    config: props.config
  });

export const Welcome = (props: {
  config: { action: () => void; user: boolean };
}) =>
  componentFactory({
    children: <WelcomePage />,
    nav: true,
    config: props.config
  });
export const Login = (props: {
  config: { action: () => void; user: boolean };
}) =>
  componentFactory({
    children: <LoginPage />,
    nav: true,
    lazy: true,
    config: props.config
  });
export const Register = (props: {
  config: { action: () => void; user: boolean };
  locations: data;
}) =>
  componentFactory({
    children: <RegisterPage register locations={props.locations} />,
    nav: true,
    lazy: true,
    config: props.config
  });
export const Municipality = (props: {
  config: { action: () => void; user: boolean };
}) =>
  componentFactory({
    children: <MunicipalityPage />,
    nav: true,
    lazy: true,
    new: true,
    config: props.config
  });

export const New = (props: {
  config: { action: () => void; user: boolean },muni:boolean;
}) =>
  componentFactory({
    children: props.muni ? <NewPage muni /> : <NewPage />,
    nav: true,
    lazy: true,
    config: props.config
  });
export const Profile = (props: {
  config: { action: () => void; user: boolean }
}) =>
  componentFactory({
    children: <ProfilePage />,
    nav: true,
    lazy: true,new: true,
    config: props.config
  });
export const Home = (props: {
  config: { action: () => void; user: boolean }
}) =>
  componentFactory({
    children: <HomePage />,
    nav: true,
    lazy: true,new: true,
    config: props.config
  });
export const Mine = (props: {
  config: { action: () => void; user: boolean }
}) =>
  componentFactory({
    children: <MinePage />,
    nav: true,
    lazy: true,new: true,
    config: props.config
  });
export const Post = (props: {
  config: { action: () => void; user: boolean }
}) =>
  componentFactory({
    children: <PostPage />,
    nav: true,
    lazy: true,
    config: props.config
  });
