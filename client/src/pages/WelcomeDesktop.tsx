import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import { data } from "../store/types";

import Login from "../features/Login";
import Button from "../components/Button";

import * as WelcomePage from "../styles/desktop/Welcome";
import Block from "../styles/desktop/Block";
import Divider from "../styles/Divider";
import InLine from "../styles/utils/InLine";

import { VectorLogo, VectorTitle, VectorSubTitle } from "../icons/Welcome";

const Welcome = (props: { direction: string; text: data }) => {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <WelcomePage.Welcome data-id='desktop__container'>
      <InLine
        data-id='desktop__header'
        direction={props.direction}
        justify='flex-end'
        padding='1rem 2rem'>
        <Button
          data-id='desktop__header_button'
          mode='primary'
          label=''
          onClick={toggleOpen}>
          {props.text["login.button.login"]}
        </Button>
      </InLine>
      <WelcomePage.Main data-id='desktop__main' direction={props.direction}>
        <Block data-id='desktop__main_left'>
          <Block
            data-id='desktop__main_logo'
            width='50%'
            minWidth='0'
            height='50%'
            padding=''
            margin='0 auto'>
            <Block width='60%' minWidth='0' height='60%' margin='0 auto'>
              <VectorLogo />
            </Block>
            <Block width='70%' minWidth='0' height='70%' margin='0 auto'>
              <VectorTitle />
            </Block>
            <Divider width='100%' margin='2rem auto' />
            <Block width='70%' minWidth='0' height='70%' margin='0 auto'>
              <VectorSubTitle />
            </Block>
          </Block>
        </Block>
        {open ? (
          <Block data-id='desktop__main_right'>
            <Block width='50%' height='60%' margin='0 auto'>
              <Login data-id='desktop__main_form' desktop />
            </Block>
          </Block>
        ) : null}
      </WelcomePage.Main>
    </WelcomePage.Welcome>
  );
};

const mapStateToProps = (state: AppState) => ({
  direction: state.language.direction,
  text: state.language.text
});

export default connect(
  mapStateToProps,
  {}
)(Welcome);
