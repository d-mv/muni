import nodeMailer from "nodemailer";
import * as dotenv from "dotenv";
import data from "../client/src/data/translation.json";
import makeHtml from "./make_html";

const dotEnv = dotenv.config();
const login: any = process.env.MAIL_LOGIN;
const pass: any = process.env.MAIL_PASS;

const languages: any = data.language;

const sendEmail = (user: string, url: string, language: string) => {
  const translated = languages[language].text;
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: login,
      pass: pass
    }
  });
  let mailOptions = {
    // should be replaced with real recipient's account
    from: login,
    to: user,
    subject: translated["email.verification.subject"],
    text: translated["email.verification.text"],
    html: makeHtml(url, language)
  };
console.log(user);
console.log(url);
console.log(language);
  console.log(transporter);
  console.log(mailOptions);
  // transporter.sendMail(mailOptions, (error: any, info: any) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log("Message %s sent: %s", info.messageId, info.response);
  // });
};

export default sendEmail
