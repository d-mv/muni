import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { showHelp } from "../store/app/actions";

import { logOff } from "../store/users/actions";

import Page from "../layout/Page";
import Header from "../components/Header";
import Section from "../layout/Section";
import Paragraph from "../layout/Paragraph";
import Line from "../layout/Line";
import LangSwitch from "../components/LangSwitch";
import Button from "../components/Button";

import style from "./style/Profile.module.scss";
import Help from "../features/Help";

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
      <Button mode='primary' action={props.logOff}>
        {text["profile.button.logOff"]}
      </Button>
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
