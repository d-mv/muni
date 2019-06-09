import React from "react";

import Page from "../layout/Page";

import layout from "./styles/Confirmation.module.scss";

const Confirmation = () => {
  return (
    <Page>
      <div className={layout.wrapper}>
        <p className={layout.centralMessage}>
          "We have sent you the confirmation email. Please, click on 'Verify'
          button in the email and then you can login with your provided
          credentials"
        </p>
      </div>
    </Page>
  );
};

export default Confirmation;
