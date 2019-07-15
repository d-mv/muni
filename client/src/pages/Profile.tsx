import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { logOff, showHelp } from "../store/users/actions";

import Header from "../components/Header";
import LangSwitch from "../components/LangSwitch";
import Button from "../components/Button";

import Page from "../layout/Page";
import Section from "../layout/Section";
import Paragraph from "../layout/Paragraph";
import Line from "../layout/Line";
import Content from "../layout/Content";

import style from "./style/Profile.module.scss";
import { data } from "../store/types";

const Profile = (props: {
  locations: data;
  user: data;
  language: data;
  logOff: () => void;
  showHelp: (arg0: boolean) => void;
}) => {
  const { locations, user, language } = props;
  const { text, direction } = language;
  const location = locations.filter((el: any) => el._id === user.location)[0];

  const headerObject = {
    name: location.name[user.settings.language]
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
              <span className={style.language}>{language.name}</span>
            </Line>
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
    locations: state.locations,
    user: state.auth.user,
    help: state.help
  };
};

export default connect(
  mapStateToProps,
  { logOff, showHelp }
)(Profile);
