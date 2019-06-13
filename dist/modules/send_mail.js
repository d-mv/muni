"use strict";
exports.__esModule = true;
var nodemailer_1 = require("nodemailer");
var dotenv = require("dotenv");
var translation_json_1 = require("../client/src/data/translation.json");
var make_html_1 = require("./make_html");
var dotEnv = dotenv.config();
var login = process.env.MAIL_LOGIN;
var pass = process.env.MAIL_PASS;
var languages = translation_json_1["default"].language;
var sendEmail = function (user, url, language) {
    var translated = languages[language].text;
    var transporter = nodemailer_1["default"].createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // should be replaced with real sender's account
            user: login,
            pass: pass
        }
    });
    var mailOptions = {
        // should be replaced with real recipient's account
        from: login,
        to: user,
        subject: translated["email.verification.subject"],
        text: translated["email.verification.text"],
        html: make_html_1["default"](url, language)
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
exports["default"] = sendEmail;
