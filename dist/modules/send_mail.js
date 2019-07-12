"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as nodeMailer from "nodemailer";
const dotenv = require("dotenv");
const make_email_1 = require("./make_email");
const nodeMailer = require('nodemailer');
const dotEnv = dotenv.config();
const login = process.env.MAIL_LOGIN;
const pass = process.env.MAIL_PASS;
const data = require("../data/data.json");
const languages = data;
const sendEmail = (user, url, language) => {
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
    const { text, html } = make_email_1.default(url, language);
    let mailOptions = {
        from: login,
        to: user,
        subject: translated["email.verification.subject"],
        text,
        html
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
    });
};
exports.default = sendEmail;
//# sourceMappingURL=send_mail.js.map