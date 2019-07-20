import React from "react";
import InColumn from "../../../styles/utils/InColumn";
import { Preview } from ".";
import InLine from "../../../styles/utils/InLine";
import SwitchLine from "../../../styles/form/SwitchTitle";
import SwitchComponent from "../../../components/Switch";
import { post } from "../../../store/types";
import Spacer from "../../../styles/utils/Spacer";

export const PreviewBlock = (props: {
  direction: string;
  post: any;
  text: string;
  muni?: boolean;
  titles?: { problem: string; solution?: string };
  onChange: () => void;
  pinned: boolean;
}) => (
  <InColumn direction={props.direction} justify='flex-start' width='undefined'>
    <Preview
      muni={props.muni}
      post={props.post}
      direction={props.direction}
      text={props.titles}
    />
    <Spacer space={1} />
    {props.muni ? (
      <InLine direction={props.direction} justify='flex-start'>
        <SwitchLine>{props.text}</SwitchLine>
        <SwitchComponent onChange={props.onChange} value={props.pinned} />
      </InLine>
    ) : null}
  </InColumn>
);
