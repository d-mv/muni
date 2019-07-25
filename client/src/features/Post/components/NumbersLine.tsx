import React from "react";

import dateBeautify from "../../../modules/date_beautify";

import Age from "../../../components/Card/components/Age";
import Voters from "../../../components/Card/components/Voters";

import { Separator } from "../../../layout/Utils";

import InLine from "../../../styles/utils/InLine";
import { PostAgeText } from "../../../styles/common/PostAge";

export const NumbersLine = (props: {
  date: string;
  daysText: { [index: string]: string };
  direction: string;
  votes?: number;
  voterText?: string;
}) => (
  <InLine direction={props.direction} justify='flex-start' padding='0 1rem'>
    <PostAgeText>{dateBeautify(props.date, "עב", true)}</PostAgeText>
    <Separator />
    <Age date={props.date} text={props.daysText} direction={props.direction} />
    {props.votes ? <Separator /> : null}
    {props.votes ? (
      <Voters
        number={props.votes || 0}
        text={props.voterText || ""}
        direction={props.direction}
      />
    ) : null}
  </InLine>
);
