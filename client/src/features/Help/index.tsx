import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { showHelp } from "../../store/users/actions";
import styleFactory from "../../modules/style_factory";

import { data } from "../../store/types";
import Home from "./components/Home";

const Help = (props: {
  language: data;
  module: string;
  help: boolean;
  showHelp: (arg0: boolean) => void;
}) => {
  const { direction } = props.language;
  const contentStyle = styleFactory("help-content", direction);

  const handleShowHelp = () => {
    props.showHelp(!props.help);
  };

  let content = <div className={contentStyle} />;
  switch (props.module) {
    case "post":
      break;
    case "home":
      content = <Home cancel={handleShowHelp} />;
      break;
  }

  const component = (
    <div onClick={() => handleShowHelp()} className='help'>
      {content}
    </div>
  );
  return component;
};

const mapStateToProps = (state: AppState) => {
  return {
    module: state.module,
    language: state.language,
    help: state.help
  };
};

export default connect(
  mapStateToProps,
  {
    showHelp
  }
)(Help);
