import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { showHelp } from "../../store/app/actions";
import styleFactory from "../../modules/style_factory";

import { data } from "../../store/types";
import Home from "./components/Home";

const Help = (props: {
  language: data;
  // help: boolean;
  module: string;
  showHelp: () => void;
}) => {
  const { direction } = props.language;
  const contentStyle = styleFactory("help-content", direction);

  let content = <div className={contentStyle} />;
  switch (props.module) {
    case "post":
      break;
    case "home":
      content = <Home cancel={props.showHelp} />;
      break;
  }
  const component = (
    <div onClick={() => props.showHelp()} className='help'>
      {content}
    </div>
  );
  return component;
};

const mapStateToProps = (state: AppState) => {
  return {
    module: state.module,
    language: state.language
    // help: state.help
  };
};

export default connect(
  mapStateToProps,
  {
    // showHelp
  }
)(Help);
