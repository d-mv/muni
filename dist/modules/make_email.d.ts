declare const makeEmail: (url: string, language: string) => {
    text: string;
    html: string;
};
export default makeEmail;
