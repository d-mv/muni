import React from "react";

import { VectorLogo, VectorTitle, VectorSubTitle } from "../icons/Welcome";
import Page from "../layout/Page";

import style from "./style/Welcome.module.scss";

const Welcome = () => {
  return (
    <Page welcome>
      <div className={style.pageContent}>
        <div className='app-logo'>
          <VectorLogo />
        </div>
        <div className='app-title'>
          <VectorTitle />
        </div>
        <div className={style.divider} />
        <div className='app-subTitle'>
          <VectorSubTitle />
        </div>
      </div>
    </Page>
  );
};

export default Welcome;
