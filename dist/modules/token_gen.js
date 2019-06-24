"use strict";
exports.__esModule = true;
/**
 * Generate token string
 * @function token
 * @param {string} request - Empty
 * @returns {string} - Return token
 */
exports.token = function () {
    var dictionary = 'abcdefjhiklmnopqrstuvxyzABCDEFJHIKLMNOPQRSTUVXYZ0123456789!#$%&()*+,-./:;<=>?@[]^_{|}~'.split("");
    var token = "";
    // build 25 char long string
    for (var i = 0; i < 26; i++) {
        var sample = dictionary[Math.floor(Math.random() * dictionary.length)];
        token = token + sample;
    }
    return token;
};
