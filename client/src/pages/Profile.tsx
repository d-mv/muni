import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { showHelp } from "../store/app/actions";
import { logOff } from "../store/users/actions";

import Help from "../features/Help";

import Header from "../components/Header";
import LangSwitch from "../components/LangSwitch";
import Button from "../components/Button";

import Page from "../layout/Page";
import Section from "../layout/Section";
import Paragraph from "../layout/Paragraph";
import Line from "../layout/Line";

import style from "./style/Profile.module.scss";

const Profile = (props: any) => {
  const { text, direction } = props.language;

  const toggleHelp = () => {
    props.showHelp(!props.help);
  };

  const header = <Header help={toggleHelp} returnTo='profile' />;
  const help = props.help ? (
    <Help
      mode='profile'
      direction={props.language.direction}
      cancel={toggleHelp}
    />
  ) : null;

  return (
    <Page>
      {header}
      {help}
      <Section>
        <Paragraph direction={direction}>
          {text["profile.text.changeLanguage"]}
        </Paragraph>
        <Paragraph direction={direction}>
          <Line direction={direction}>
            <LangSwitch />
            <span className={style.language}>{props.language.name}</span>
          </Line>
        </Paragraph>
      </Section>
      <Section>
        <Paragraph direction={direction}>
          {text["profile.text.logOff"]}
        </Paragraph>
      </Section>
      <Paragraph direction={direction}>
        <Button mode='primary' action={props.logOff}>
          {text["profile.button.logOff"]}
        </Button>
      </Paragraph>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    help: state.help
  };
};

export default connect(
  mapStateToProps,
  { logOff, showHelp }
)(Profile);
