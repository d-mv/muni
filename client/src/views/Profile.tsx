import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { logOff } from "../store/users/actions";

import Page from "../layout/Page";
import Header from '../components/Header'
import Section from "../layout/Section";
import Paragraph from "../layout/Paragraph";
import Line from '../layout/Line';
import LangSwitch from "../components/LangSwitch";
import Button from '../elements/Button'

import layout from "../styles/_layout.module.scss";
import style from "../styles/Profile.module.scss";

const Profile = (props: any) => {
  const {text,direction} = props.language
  return (
    <Page>
      <Header />
      <Section>
        <Paragraph>{text["profile.text.changeLanguage"]}</Paragraph>
        <Line direction={direction}>
          <LangSwitch />
          <span>{props.language.name}</span>
        </Line>
      </Section>
      <Section>
        <Paragraph>{text["profile.text.logOff"]}</Paragraph>
        <Button title={text["profile.button.logOff"]} action={props.logOff} />
      </Section>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language
  };
};

export default connect(
  mapStateToProps,
  { logOff }
)(Profile);
