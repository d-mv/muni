"use strict";
exports.__esModule = true;
var translation_json_1 = require("../client/src/data/translation.json");
var languages = translation_json_1["default"].language;
var makeHtml = function (url, language) {
    var text = languages[language].text.text;
    var result = "<h1>" + "this is going to be text" + "</h1><p>this is URL: " + url + "</p>";
    return result;
};
exports["default"] = makeHtml;
