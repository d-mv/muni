"use strict";
exports.__esModule = true;
var nodeMailer = require("nodemailer");
var dotenv = require("dotenv");
var translation_1 = require("./translation");
var make_email_1 = require("./make_email");
var dotEnv = dotenv.config();
var login = process.env.MAIL_LOGIN;
var pass = process.env.MAIL_PASS;
var languages = translation_1["default"].language;
var sendEmail = function (user, url, language) {
    var translated = languages[language].text;
    var transporter = nodeMailer.createTransport({
        host: "smtpout.secureserver.net",
        port: 465,
        secure: true,
        auth: {
            // should be replaced with real sender's account
            user: login,
            pass: pass
        }
    });
    var _a = make_email_1["default"](url, language), text = _a.text, html = _a.html;
    var mailOptions = {
        // should be replaced with real recipient's account
        from: login,
        to: user,
        subject: translated["email.verification.subject"],
        text: text,
        html: html
    };
    // console.log(user);
    // console.log(url);
    // console.log(language);
    // console.log(transporter);
    // console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
    });
};
exports["default"] = sendEmail;
