import data from "../client/src/data/translation.json";
const languages: any = data.language;

const makeHtml = (url: string, language: string) => {
  const { text } = languages[language].text;
  const result = `<h1>${"this is going to be text"}</h1><p>this is URL: ${url}</p>`;
  return result
};

export default makeHtml
