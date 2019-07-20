"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker");
const images_1 = require("./images");
const Location = require("../models/location");
const User = require("../models/user");
const Post = require("../models/post");
const Category = require("./../models/category");
const News = require("./../models/news");
const locationArray = [
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
const categoryArray = [
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
const randomNumber = (max) => faker.random.number({
    min: 0,
    max
});
const getImage = () => images_1.default[randomNumber(images_1.default.length - 1)];
const categories = () => __awaiter(this, void 0, void 0, function* () {
    try {
        categoryArray.forEach((el) => __awaiter(this, void 0, void 0, function* () {
            const category = new Category(el);
            yield category.save();
        }));
        return "Categories creation - done";
    }
    catch (error) {
        return "Categories creation - error";
    }
});
const locations = () => __awaiter(this, void 0, void 0, function* () {
    try {
        locationArray.forEach((el) => __awaiter(this, void 0, void 0, function* () {
            const location = new Location(el);
            yield location.save();
        }));
        return "Locations creation - done";
    }
    catch (error) {
        return "Locations creation - error";
    }
});
const users = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const listOfLocations = yield Location.find({});
        listOfLocations.forEach((loc) => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < randomNumber(6); i++) {
                const user = new User({
                    pass: "1234567",
                    fName: faker.name.firstName(),
                    lName: faker.name.lastName(),
                    email: faker.internet.email(),
                    location: loc._id,
                    status: true
                });
                yield user.save();
            }
        }));
        return "Users creation - done";
    }
    catch (error) {
        return "Users creation - error";
    }
});
const posts = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const listOfLocations = yield Location.find({});
        const listOfUsers = yield User.find({});
        const louLength = listOfUsers.length - 1;
        const listOfCategories = yield Category.find({});
        listOfLocations.forEach((loc) => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 20; i++) {
                console.log("new post");
                const usr = listOfUsers[randomNumber(louLength)];
                let other = listOfUsers[randomNumber(louLength)];
                const post = new Post({
                    title: faker.lorem.sentence(),
                    problem: faker.lorem.paragraphs(5),
                    solution: faker.lorem.paragraphs(2),
                    photo: getImage(),
                    link: faker.internet.url(),
                    location: loc._id,
                    category: listOfCategories[randomNumber(listOfCategories.length - 1)],
                    createdBy: usr._id,
                    votes: [other === usr ? listOfUsers[randomNumber(louLength)] : other]
                    // reply:{ text:'', up: [], down: [] }
                });
                yield post.save();
            }
        }));
        return "Posts creation - done";
    }
    catch (error) {
        return "Posts creation - error";
    }
});
const news = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const listOfLocations = yield Location.find({});
        listOfLocations.forEach((loc) => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < randomNumber(20); i++) {
                const post = new News({
                    title: faker.lorem.sentence(),
                    text: faker.lorem.paragraphs(5),
                    photo: getImage(),
                    link: faker.internet.url(),
                    location: loc._id,
                    pinned: i === 0 ? true : false
                });
                yield post.save();
            }
        }));
        return "News creation - done";
    }
    catch (error) {
        return "News creation - error";
    }
});
// ! activate the below
const dbSeed = () => __awaiter(this, void 0, void 0, function* () {
    try {
        // const category = await categories();
        // const location = await locations();
        // const user = await users();
        const post = yield posts();
        // const newsPosts = await news();
        return [
            // category,
            // location,
            // user,
            post
            // newsPosts
        ];
    }
    catch (error) {
        return error;
    }
});
exports.default = dbSeed;
//# sourceMappingURL=db_seed.js.map