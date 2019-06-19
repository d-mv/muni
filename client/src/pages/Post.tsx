import React from "react";

import Login from "../features/Login";
import Register from "../features/Register";

import LangSwitch from "../components/LangSwitch";

import Page from "../layout/Page";
import PostComponent from '../features/Post'
import style from "./style/Login.module.scss";
import { data } from "../store/types";
import Content from "../layout/Content";
import Header from "../components/Header";

/** Functional component to render login/register page
 * @returns {JSX.Element} - Login page
 */
const Post = (props: { post: any; locationData: any }) => {
  const { post } = props;

  const main = "";
const mockFn=()=>{}
  const author = post.createdBy === props.locationData._id;
  const muniUser = props.locationData.type;
  let header = <Header help={mockFn} returnTo='home' edit action={mockFn} />;
  if (!author)
    header = <Header help={mockFn} returnTo='home' complain action={mockFn} />;
  if (muniUser) header = <Header help={mockFn} returnTo='home' />;

  return (
    <Page>
      {header}
      <Content padded>
        <PostComponent post={post} action={mockFn} />;
      </Content>
    </Page>
  );
};

export default Post;
