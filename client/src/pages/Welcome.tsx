import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import Logo from '../components/Logo'

import Page from "../layout/Page";
import Paragraph from '../layout/Paragraph'
import Center from '../layout/Center'

import style from './styles/Welcome.module.scss'

const Welcome = (props: any) => {
  return (
    <Page welcome>
      <Logo />
      <div className={style.text}>
        {/* <Paragraph> */}
        <Center>
          App
          </Center>
        {/* </Paragraph> */}
      </div>
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
  {}
)(Welcome);
