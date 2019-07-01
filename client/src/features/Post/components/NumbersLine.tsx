import React from "react";

import dateBeautify from "../../../modules/date_beautify";

import Age from "../../Card/components/Age";
import Voters from "../../Card/components/Voters";

import { Separator } from "../../../layout/Utils";

import style from "./style/NumbersLine.module.scss";

export  const NumbersLine = (props: {
  date: string;
  daysText: {[index:string]:string};
  direction: string;
  votes?: number;
  voterText?: string;
}) => {
  const date = (
    <div className={style.date}>{dateBeautify(props.date, "עב", true)}</div>
  );
  const voters = props.votes?(<Voters
        number={props.votes || 0}
        text={props.voterText || ''}
        direction={props.direction}
  />) : null

  return (
    <div className={style.numbers}>
      {date}
      <Separator />
      <Age
        date={props.date}
        text={props.daysText}
        direction={props.direction}
      />
      {props.votes? <Separator />:null}
      {voters}
    </div>
  );
};
