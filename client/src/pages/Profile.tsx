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
import Content from "../layout/Content";

const Profile = (props: any) => {
  const { text, direction } = props.language;

  const headerObject = {
    name: props.location.name[props.language.short]
  };

  return (
    <Page>
      <Header {...headerObject} />
      <Content header>
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
            <Line direction={direction}>{props.location.type}</Line>
            <Line direction={direction}>{props.location._id}</Line>
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
      </Content>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    language: state.language,
    location: state.locationData,
    help: state.help
  };
};

export default connect(
  mapStateToProps,
  { logOff, showHelp }
)(Profile);
