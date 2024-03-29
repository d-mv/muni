import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import App from "./app/App";
import AppDesktop from "./app/AppDesktop";
// import AppDesktop from "./AppDesktop";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store";

import "./styles/index.scss";
// TODO: remove
import "./style/start.scss";

const store = configureStore();

const width = window.screen.width > 500;
const height = window.screen.height > 500;

const app = width && height ? <AppDesktop /> : <App />;

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>{app}</Provider>
  </CookiesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
