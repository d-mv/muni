import React from "react";
import { connect } from "react-redux";

import { AppState } from "../store";

import {logOff }from '../store/users/actions'
import PinnedCard from "../components/Card/PinnedCard";

import Header from "../components/Header";
import PostList from "../components/PostList";

import Page from "../layout/Page";
import Content from "../layout/Content";
import { data, post, indexedObjAny } from "../store/types";
import style from "./style/HomeDesktop.module.scss";
import Card from "../components/Card";
import Button from "../components/Button";
import chartsData from '../data/charts.json'
import { AuthState } from "../models";

const Home = (props: {
  posts: post[];
  pinned: any;
  language: data;
  locations: data;
  auth:AuthState
  logOff: () => {}
}) => {
  const { locations, auth } = props
  const {user} = auth
  const { text } = props.language;
const charts:indexedObjAny=chartsData
  const location = locations.filter((el: any) => el._id === user.location)[0];



  const sortPostList = (posts: post[]) => {
    return posts.sort((a: post, b: post) =>
      a.votes.length < b.votes.length ? 1 : -1
    );
  };

  return (
    <div className={style.desktop}>
      <div className={style.header}>
        <p>
          {location}
        </p>
        <div>
          <Button mode='primarySmall' action={props.logOff}>
            {text["profile.button.logOff"]}
          </Button>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.graphs}>{charts[user.location].map((chart: any) =>
          <div>
            <div className={style.chartTitle}>{chart.name}</div>
            <iframe title="static_html" className={style.chart} src={chart.url}/>
         </div>
        )}</div>
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
    locations: state.locations,
    auth: state.auth,
    language: state.language,
    posts: state.posts,
    pinned: state.news.filter((el: any) => el.active && el.pinned)
  };
};

export default connect(
  mapStateToProps,
  {logOff}
)(Home);
