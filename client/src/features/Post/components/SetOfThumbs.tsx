import React from "react";

import style from "./style/SetOfThumbs.module.scss";
import Thumb from "../../../icons/Thumb";
import styleFactory from "../../../modules/style_factory";
import { goBack } from "../../../icons";

export interface SoTprops {
  fill: string;
  onClick: (arg0: boolean) => void;
  direction: string;
}

export class SetOfThumbs extends React.Component<SoTprops> {
  handleClick = (arg0: boolean) => {
    console.log('arg0');
  };
  render() {
    console.log('hi')
    return (
      <div className={style[styleFactory("container", this.props.direction)]}>
        <div onClick={(event: any) => this.handleClick(true)}>{goBack('white')}</div>
        <div onClick={(event: any) => this.handleClick(false)}>goBack('white')</div>
      </div>
    );
  }
}
