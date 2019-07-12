import { emailHtml, emailText } from "./email_template";
const data = require("../data/data.json")
const languages: any = data;

const makeEmail = (url: string, language: string) => {
  const { text, direction } = languages[language];
  const content = {
    title: text["email.title"],
    paragraph: text["email.paragraph"],
    button: text["email.button"],
    copy: text["email.copy"],
    thanks: text["email.thanks"]
  };
  return {
    text: emailText(content, encodeURI(url), direction),
    html: emailHtml(content, encodeURI(url), direction)
  };
};

export default makeEmail;