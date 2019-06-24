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
  votes: number;
  voterText: string;
}) => {
  const date = (
    <div className={style.date}>{dateBeautify(props.date, "עב", true)}</div>
  );
  return (
    <div className={style.numbers}>
      {date}
      <Separator />
      <Age
        date={props.date}
        text={props.daysText}
        direction={props.direction}
      />
      <Separator />
      <Voters
        number={props.votes}
        text={props.voterText}
        direction={props.direction}
      />
    </div>
  );
};
