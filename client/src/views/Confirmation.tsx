import React from "react";
import layout from "../styles/_layout.module.scss";

const Confirmation = () => {
  return (
    <main className={layout.mainOpposite}>
      <p className={layout.centralMessage}>
        "We have sent you the confirmation email. Please, click on 'Verify'
        button in the email and then you can login with your provided
        credentials"
      </p>
    </main>
  );
};

export default Confirmation;