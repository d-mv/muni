import React from "react";

import Solution from "./Solution";
import Problem from "./Problem";

import Section from "../../../layout/Section";
import Line from "../../../layout/Line";

const Text = (props: {
  step?: boolean;
  back?: boolean;
  muni?: boolean;
  title?: string;
  text: string;
  direction: string;
}) => {
  const { direction } = props;
  const title = props.title ? (
    <Line flat direction={props.direction}>
      <h4>{props.title}</h4>
    </Line>
  ) : null;

  const text = props.back ? (
    <Solution text={props.text} direction={direction} />
  ) : (
    <Problem text={props.text} direction={direction} />
  );

  let wrapper: React.ClassicElement<any> = <div />;

  if (props.step) {
    wrapper = (
      <Section step>
        {title}
        {text}
      </Section>
    );
  } else if (props.back) {
    wrapper = (
      <Section back>
        {title}
        {text}
      </Section>
    );
  } else if (props.muni) {
    wrapper = (
      <Section step>
        {title}
        {text}
      </Section>
    );
  }
  return wrapper;
};

export default Text;
