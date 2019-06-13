import data from "./translation.json";
import { emailHtml, emailText } from "./email_template";
const languages: any = data.language;

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
