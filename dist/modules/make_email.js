"use strict";
exports.__esModule = true;
var translation_1 = require("./translation");
var email_template_1 = require("./email_template");
var languages = translation_1["default"].language;
var makeEmail = function (url, language) {
    var _a = languages[language], text = _a.text, direction = _a.direction;
    var content = {
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
exports["default"] = makeEmail;
