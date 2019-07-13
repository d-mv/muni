"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailHtml = (text, url, direction) => {
    return `<html style="font-family: Arial, Helvetica, sans-serif; font-size: 62.5%; color: #444; direction:${direction};" > <br/> <h1 style="font-size: 2rem;">${text.title}</h1> <p style="font-size: 1.5rem;">${text.paragraph}</p><a style="appearance: none; background-color: #478fdf; border: none; outline: none; display: block; margin: 1rem auto; padding: 1rem 2rem; border-radius: 0.4rem; box-shadow: 0 0.1rem 0.3rem rgba(68, 68, 68, 0.3), 0 1px 0.2rem rgba(68, 68, 68, 0.24); max-width: 6rem;text-align:center;; color: #fff; user-select: none; letter-spacing: 0.2rem; text-transform: uppercase; font-weight: 700; text-decoration: none;" href="${url}" target="_blank">${text.button}</a> <p style="font-size: 1.5rem;"> ${text.copy} </p><p style="font-size: 1.3rem; color: #478fdf; text-decoration: underline;">${url}</p><p style="font-size: 1.5rem;">${text.thanks}</p></html>`;
};
exports.emailText = (text, url, direction) => `${text.paragraph}\n${url}\n${text.thanks}`;
//# sourceMappingURL=email_template.js.map