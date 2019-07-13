// import * as nodeMailer from "nodemailer";
import * as dotenv from "dotenv";

import makeEmail from "./make_email";
const nodeMailer = require('nodemailer')
const dotEnv = dotenv.config();
const login: any = process.env.MAIL_LOGIN;
const pass: any = process.env.MAIL_PASS;

const data = require("../data/data.json");
const languages: any = data;

const sendEmail = (user: string, url: string, language: string) => {
  const translated = languages[language].text;
  let transporter = nodeMailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: login,
      pass: pass
    }
  });

  const { text, html } = makeEmail(url, language);
  let mailOptions = {
    from: login,
    to: user,
    subject: translated["email.verification.subject"],
    text,
    html
  };
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
};

export default sendEmail;
