import React from "react";

import Page from "../layout/Page";
import Header from "../components/Header";
import Steps from '../components/New/Steps'

const New = () => {
  return (
    <Page>
      <Header />
      <div>New</div>
      <Steps />
    </Page>
  );
};

export default New;
