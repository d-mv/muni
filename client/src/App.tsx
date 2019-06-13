import React, { Suspense } from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";

import { AppState } from "./store";
import { loadData, setLocationData } from "./store/app/actions";
import {
  setModule,
  setToken,
  checkToken,
  login,
  fetchLocations,
  setAuth
} from "./store/users/actions";

import NewButton from "./features/New/components/NewButton";
import Navigation from "./features/Navigation";

import Loading from "./pages/Loading";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";

import "./style/App.scss";

const App = (props: any) => {
  const { auth } = props;
  const { token } = props;
  const [loading, setLoading] = React.useState(true);

  const { login } = props;
  const { cookies } = props;

  const fetch = () => setInterval(props.fetchLocations(), 1200000);

  React.useEffect(() => {
    console.log(1);
    if (!auth) {
      props.setModule("welcome");
      setLoading(false);
    }
  }, [auth]);

  // set cookies if token changes
  React.useEffect(() => {
    // if 'clear'
    if (props.token === "clear") {
      console.log(0);
      cookies.set("token", "");
      props.setToken("");
      props.setModule("welcome");
    } else if (props.token !== "" && props.token !== "clear") {
      // if token IS
      cookies.set("token", props.token);
      // setToken(props.token);
      console.log(5);
      props.setModule("home");
      setLoading(false);
      props.setAuth(true);
    } else if (cookies.get("token") && cookies.get("token").length > 0) {
      console.log(2);
      props.checkToken(cookies.get("token"));
    } else {
      setLoading(false);
    }
  }, [token]);

  // fetch locations
  React.useEffect(() => {
    fetch();
  }, []);

  const handleNewButtonClick = () => {
    props.setModule("new");
  };
  const AppComponent = (props: { children: any }) => (
    <div className='app'>{props.children}</div>
  );
  const LazyComponent = (props: { children: any }) => (
    <Suspense fallback={<Loading />}>{props.children}</Suspense>
  );

  const componentFactory = (props: {
    children: any;
    lazy?: boolean;
    nav?: boolean;
    new?: boolean;
  }) => {
    const nav = props.nav ? <Navigation /> : null;
    const newButton = props.new ? (
      <NewButton action={handleNewButtonClick} />
    ) : null;
    let content = props.lazy ? (
      <AppComponent>
        <LazyComponent>
          {nav}
          {newButton}
          {props.children}
        </LazyComponent>
      </AppComponent>
    ) : (
      <AppComponent>
        {nav}
        {newButton}
        {props.children}
      </AppComponent>
    );
    return content;
  };
  let show = componentFactory({ children: <Welcome />, nav: true });
  switch (props.module) {
    case "login":
      show = componentFactory({ children: <Login />, nav: true });
      break;
    case "confirmation":
      const Confirmation = React.lazy(() => import("./pages/Confirmation"));
      show = componentFactory({
        children: <Confirmation />,
        nav: true,
        lazy: true
      });
      break;
    case "municipality":
      const Municipality = React.lazy(() => import("./pages/Municipality"));
      show = componentFactory({
        children: <Municipality />,
        nav: true,
        lazy: true,
        new: true
      });
      break;
    case "new":
      const New = React.lazy(() => import("./pages/New"));
      show = componentFactory({
        children: <New />,
        nav: true,
        lazy: true
      });
      break;
    case "profile":
      const Profile = React.lazy(() => import("./pages/Profile"));
      show = componentFactory({
        children: <Profile />,
        nav: true,
        lazy: true,
        new: true
      });
      break;
    case "home":
      const Home = React.lazy(() => import("./pages/Home"));
      show = componentFactory({
        children: <Home />,
        nav: true,
        lazy: true,
        new: true
      });
      break;
    case "mine":
      const Mine = React.lazy(() => import("./pages/Mine"));
      show = componentFactory({
        children: <Mine />,
        nav: true,
        lazy: true,
        new: true
      });
      break;
  }

  const content = loading ? <Loading /> : show;

  return content;
};

const mapStateToProps = (state: AppState) => {
  return {
    token: state.token,
    module: state.module,
    loginResult: state.login,
    language: state.language,
    locationData: state.locationData,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    setModule,
    setToken,
    checkToken,
    login,
    fetchLocations,
    loadData,
    setLocationData,
    setAuth
  }
)(withCookies(App));
