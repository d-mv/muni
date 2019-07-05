"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var faker = require("faker");
var images_1 = require("./images");
var Location = require("../models/location");
var User = require("../models/user");
var Post = require("../models/post");
var Category = require("./../models/category");
var News = require("./../models/news");
var locationArray = [
    {
        name: {
            עב: "חיפה",
            ع: "حيفا‎",
            en: "Haifa"
        }
    },
    {
        name: {
            עב: "תל־אביב–יפו",
            ع: "تل أبيب - يافا",
            en: "Tel Aviv-Jaffa"
        }
    },
    {
        name: {
            עב: "ירושלים",
            ع: "القُدس ",
            en: "Jerusalem"
        }
    }
];
var categoryArray = [
    {
        name: { en: "Infrastructure", עב: "תשתיות", ع: "بنية تحتية" },
        description: {
            עב: "Includes Streets situation, electricity, water and sewage, transportation."
        }
    },
    {
        name: { en: "Education", עב: "חינוך", ع: "التربية والتعليم" },
        description: {
            עב: "Schools, colleges, teachers, informal education/classes from Muni to children."
        }
    },
    {
        name: {
            en: "Financials/finance/budgets",
            עב: "דוחות כספיים/תקציבים",
            ع: "الموارد المالية/ميزانيات"
        },
        description: {
            עב: "Including municipalities budgets and how they're spent."
        }
    },
    {
        name: { en: "Safety", עב: "בטיחות", ع: "امن وامان" },
        description: {
            עב: "Including incidents in neighborhoods, violent incidents, hazards."
        }
    },
    {
        name: {
            en: "Health and Welfare",
            עב: "בריאות ורווחה",
            ع: "الصحة والشؤون الاجتماعية"
        },
        description: {
            עב: "Including hospitals situations, public clinics, infants clinics, welfare institutions and services"
        }
    }
];
var randomNumber = function (max) {
    return faker.random.number({
        min: 0,
        max: max
    });
};
var getImage = function () { return images_1["default"][randomNumber(images_1["default"].length - 1)]; };
var categories = function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        try {
            categoryArray.forEach(function (el) { return __awaiter(_this, void 0, void 0, function () {
                var category;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            category = new Category(el);
                            return [4 /*yield*/, category.save()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/, "Categories creation - done"];
        }
        catch (error) {
            return [2 /*return*/, "Categories creation - error"];
        }
        return [2 /*return*/];
    });
}); };
var locations = function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        try {
            locationArray.forEach(function (el) { return __awaiter(_this, void 0, void 0, function () {
                var location;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            location = new Location(el);
                            return [4 /*yield*/, location.save()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/, "Locations creation - done"];
        }
        catch (error) {
            return [2 /*return*/, "Locations creation - error"];
        }
        return [2 /*return*/];
    });
}); };
var users = function () { return __awaiter(_this, void 0, void 0, function () {
    var listOfLocations, error_1;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Location.find({})];
            case 1:
                listOfLocations = _a.sent();
                listOfLocations.forEach(function (loc) { return __awaiter(_this, void 0, void 0, function () {
                    var i, user;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                i = 0;
                                _a.label = 1;
                            case 1:
                                if (!(i < randomNumber(3))) return [3 /*break*/, 4];
                                user = new User({
                                    pass: "1234567",
                                    fName: faker.name.firstName(),
                                    lName: faker.name.lastName(),
                                    email: faker.internet.email(),
                                    location: loc._id,
                                    status: true
                                });
                                return [4 /*yield*/, user.save()];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, "Users creation - done"];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, "Users creation - error"];
            case 3: return [2 /*return*/];
        }
    });
}); };
var posts = function () { return __awaiter(_this, void 0, void 0, function () {
    var listOfLocations, listOfUsers_1, louLength_1, listOfCategories_1, error_2;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, Location.find({})];
            case 1:
                listOfLocations = _a.sent();
                return [4 /*yield*/, User.find({})];
            case 2:
                listOfUsers_1 = _a.sent();
                louLength_1 = listOfUsers_1.length - 1;
                return [4 /*yield*/, Category.find({})];
            case 3:
                listOfCategories_1 = _a.sent();
                listOfLocations.forEach(function (loc) { return __awaiter(_this, void 0, void 0, function () {
                    var i, usr, post;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                i = 0;
                                _a.label = 1;
                            case 1:
                                if (!(i < randomNumber(10))) return [3 /*break*/, 4];
                                usr = listOfUsers_1[randomNumber(louLength_1)];
                                post = new Post({
                                    title: faker.lorem.sentence(),
                                    problem: faker.lorem.paragraphs(5),
                                    solution: faker.lorem.paragraphs(2),
                                    photo: getImage(),
                                    link: faker.internet.url(),
                                    location: loc._id,
                                    category: listOfCategories_1[randomNumber(listOfCategories_1.length - 1)],
                                    createdBy: usr._id,
                                    votes: [
                                        listOfUsers_1[randomNumber(louLength_1)],
                                        listOfUsers_1[randomNumber(louLength_1)],
                                        listOfUsers_1[randomNumber(louLength_1)]
                                    ]
                                });
                                return [4 /*yield*/, post.save()];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, "Posts creation - done"];
            case 4:
                error_2 = _a.sent();
                return [2 /*return*/, "Posts creation - error"];
            case 5: return [2 /*return*/];
        }
    });
}); };
var news = function () { return __awaiter(_this, void 0, void 0, function () {
    var listOfLocations, error_3;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Location.find({})];
            case 1:
                listOfLocations = _a.sent();
                listOfLocations.forEach(function (loc) { return __awaiter(_this, void 0, void 0, function () {
                    var i, post;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                i = 0;
                                _a.label = 1;
                            case 1:
                                if (!(i < randomNumber(10))) return [3 /*break*/, 4];
                                post = new News({
                                    title: faker.lorem.sentence(),
                                    text: faker.lorem.paragraphs(5),
                                    photo: getImage(),
                                    link: faker.internet.url(),
                                    location: loc._id,
                                    pinned: i === 0 ? true : false
                                });
                                return [4 /*yield*/, post.save()];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, "News creation - done"];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, "News creation - error"];
            case 3: return [2 /*return*/];
        }
    });
}); };
// ! activate the below
var dbSeed = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            // const category = await categories();
            // const location = await locations();
            // const user = await users();
            // const post = await posts();
            // const newsPosts = await news();
            return [2 /*return*/, [
                // category
                // location,
                // user
                // post
                // newsPosts
                ]];
        }
        catch (error) {
            return [2 /*return*/, error];
        }
        return [2 /*return*/];
    });
}); };
exports["default"] = dbSeed;
