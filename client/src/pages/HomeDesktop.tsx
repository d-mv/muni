import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import { logOff } from "../store/users/actions";
import { data, post, indexedObjAny } from "../store/types";
import style from "./style/HomeDesktop.module.scss";
import Button from "../components/Button";
import chartsData from "../data/charts.json";
import { AuthState } from "../models";
import InLine from "../styles/utils/InLine";
import Title from "../styles/Title";

const Home = (props: {
  direction: string;
  posts: post[];
  pinned: any;
  language: data;
  locations: data;
  auth: AuthState;
  logOff: () => {};
}) => {
  const { locations, auth } = props;
  const { user } = auth;
  const { text, short } = props.language;
  const data: indexedObjAny = chartsData;
  const charts = data[user.location] || [];
  const location = locations[0].name[short];

  // console.log(user)
  return (
    <div className={style.desktop}>
      <InLine
        direction={props.direction}
        justify='space-between'
        padding='.5rem 2rem'>
        <Title>{location}</Title>
        <div>
          <Button mode='primarySmall' onClick={props.logOff}>
            {text["profile.button.logOff"]}
          </Button>
        </div>
      </InLine>

      <div className={style.content}>
        <div className={style.graphs}>
          {charts.map((chart: any) => (
            <div>
              {/* <div className={style.chartTitle}>{chart.name}</div> */}
              <iframe
                data-id={chart.name}
                title='static_html'
                className={style.chart}
                src={chart.url}
              />
            </div>
          ))}
        </div>
        {/* <div className={style.posts}>
          {props.posts.map((post: any) => (
            <div key={post._id} className={style.post}>
              <Card post={post} />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    direction: state.language.direction,
    locations: state.locations,
    auth: state.auth,
    language: state.language,
    posts: state.posts,
    pinned: state.news.filter((el: any) => el.active && el.pinned)
  };
};

export default connect(
  mapStateToProps,
  { logOff }
)(Home);
