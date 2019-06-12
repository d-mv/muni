"use strict";
exports.__esModule = true;
var compareObjects = function (object1, object2) {
    var check = 0;
    var counter = 0;
    Object.keys(object1).map(function (el) {
        if (typeof object1[el] === "object") {
            Object.keys(object1[el]).map(function (ele) {
                var equal = object1[el][ele] === object2[el][ele];
                if (equal) {
                    check += 1;
                }
                counter += 1;
            });
        }
        else {
            var equal = object1[el] === object2[el];
            if (equal) {
                check += 1;
            }
            counter += 1;
        }
    });
    return check === counter;
};
exports["default"] = compareObjects;
