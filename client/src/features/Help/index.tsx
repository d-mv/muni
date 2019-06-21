import React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { showHelp} from '../../store/app/actions'
import styleFactory from "../../modules/style_factory";

import { data } from "../../store/types";

const Help = (props: {
  language: data;
  help: boolean;
  showHelp: (arg0:boolean) => void;
}) => {
  const { direction} = props.language
  const contentStyle = styleFactory("help-content", direction);

  let content = <div className={contentStyle} />;
  // switch (props.mode) {
  //   case "post":
  //     break;
  //   case "home":
  //     content = <Home cancel={props.cancel} />;
  //     break;
  // }
  const component = (

    <div onClick={() => props.showHelp(!props.help)} className='help'>
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