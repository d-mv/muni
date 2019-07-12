"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const email_template_1 = require("./email_template");
const data = require("../data/data.json");
const languages = data;
const makeEmail = (url, language) => {
    const { text, direction } = languages[language];
    const content = {
        title: text["email.title"],
        paragraph: text["email.paragraph"],
        button: text["email.button"],
        copy: text["email.copy"],
        thanks: text["email.thanks"]
    };
    return {
        text: email_template_1.emailText(content, encodeURI(url), direction),
        html: email_template_1.emailHtml(content, encodeURI(url), direction)
    };
};
exports.default = makeEmail;
//# sourceMappingURL=make_email.js.map