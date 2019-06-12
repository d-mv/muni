import React from "react";

import styleFactory from "../../modules/style_factory";

import Home from "./components/Home";

import styles from "./style/index.module.scss";

const Help = (props: {
  mode: string;
  direction: string;
  cancel: () => void;
}) => {
  const helpStyle = styles[styleFactory("help", props.direction)];

  let content = <div className={styles["content"]} />;
  switch (props.mode) {
    case "post":
      break;
    case "home":
      content = <Home cancel={props.cancel} />;
      break;
  }
  const component = (
    <div onClick={() => props.cancel()} className={styles["modal"]}>
      {content}
    </div>
  );
  return component;
};

export default Help;
