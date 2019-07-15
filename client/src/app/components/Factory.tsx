import React, { Suspense } from "react";

import Loading from "../../pages/Loading";
import WelcomePage from "../../pages/Welcome";
import WelcomeDesktopPage from "../../pages/WelcomeDesktop";
import Navigation from "../../features/Navigation";
import NewButton from "../../features/New/components/NewButton";
import { data } from "../../store/types";

const Enter = React.lazy(() => import("../../pages/Enter"));
const ConfirmationPage = React.lazy(() => import("../../pages/Confirmation"));
const MunicipalityPage = React.lazy(() => import("../../pages/Municipality"));
const NewPage = React.lazy(() => import("../../pages/New"));
const PostPage = React.lazy(() => import("../../pages/Post"));
const HomePage = React.lazy(() => import("../../pages/Home"));
const HomeDesktopPage = React.lazy(() => import("../../pages/HomeDesktop"));
const MinePage = React.lazy(() => import("../../pages/Mine"));
const ProfilePage = React.lazy(() => import("../../pages/Profile"));

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
    children: <ConfirmationPage />,
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
export const WelcomeDesktop = (props: {
  config: { action: () => void; user: boolean };
}) =>
  componentFactory({
    children: <WelcomeDesktopPage />,
    nav: true,
    config: props.config
  });
export const Login = (props: {
  config: { action: () => void; user: boolean };
}) =>
  componentFactory({
    children: <Enter />,
    nav: true,
    lazy: true,
    config: props.config
  });
export const LoginDesktop = (props: {
  config: { action: () => void; user: boolean };
}) =>
  componentFactory({
    children: <Enter desktop />,
    nav: true,
    lazy: true,
    config: props.config
  });
export const Register = (props: {
  config: { action: () => void; user: boolean };
  locations: data;
}) =>
  componentFactory({
    children: <Enter register locations={props.locations} />,
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
  config: { action: () => void; user: boolean };
  muni: boolean;
}) =>
  componentFactory({
    children: props.muni ? <NewPage muni /> : <NewPage />,
    nav: true,
    lazy: true,
    config: props.config
  });
export const Profile = (props: {
  config: { action: () => void; user: boolean };
}) =>
  componentFactory({
    children: <ProfilePage />,
    nav: true,
    lazy: true,
    new: true,
    config: props.config
  });
export const Home = (props: {
  config: { action: () => void; user: boolean };
}) =>
  componentFactory({
    children: <HomePage />,
    nav: true,
    lazy: true,
    new: true,
    config: props.config
  });
export const HomeDesktop = (props: {
  config: { action: () => void; user: boolean };
}) =>
  componentFactory({
    children: <HomeDesktopPage />,
    nav: true,
    lazy: true,
    config: props.config
  });
export const Mine = (props: {
  config: { action: () => void; user: boolean };
}) =>
  componentFactory({
    children: <MinePage />,
    nav: true,
    lazy: true,
    new: true,
    config: props.config
  });
export const Post = (props: {
  config: { action: () => void; user: boolean };
  news?: boolean;
}) =>
  componentFactory({
    children: <PostPage news={props.news} />,
    nav: true,
    lazy: true,
    new: true,
    config: props.config
  });
