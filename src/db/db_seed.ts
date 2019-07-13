import * as faker from "faker";
import imagesArray from "./images";
import { LocationType } from "../models/location";
import { PostType } from "../models/post";
import { UserType } from "./../models/user";

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
      עב:
        "Includes Streets situation, electricity, water and sewage, transportation."
    }
  },
  {
    name: { en: "Education", עב: "חינוך", ع: "التربية والتعليم" },
    description: {
      עב:
        "Schools, colleges, teachers, informal education/classes from Muni to children."
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
      עב:
        "Including hospitals situations, public clinics, infants clinics, welfare institutions and services"
    }
  }
];

const randomNumber = (max: number) =>
  faker.random.number({
    min: 0,
    max
  });

const getImage = () => imagesArray[randomNumber(imagesArray.length - 1)];

const categories = async () => {
  try {
    categoryArray.forEach(async (el: any) => {
      const category = new Category(el);
      await category.save();
    });
    return "Categories creation - done";
  } catch (error) {
    return "Categories creation - error";
  }
};
const locations = async () => {
  try {
    locationArray.forEach(async (el: any) => {
      const location = new Location(el);
      await location.save();
    });
    return "Locations creation - done";
  } catch (error) {
    return "Locations creation - error";
  }
};

const users = async () => {
  try {
    const listOfLocations = await Location.find({});
    listOfLocations.forEach(async (loc: LocationType) => {
      for (let i = 0; i < randomNumber(6); i++) {
        const user = new User({
          pass: "1234567",
          fName: faker.name.firstName(),
          lName: faker.name.lastName(),
          email: faker.internet.email(),
          location: loc._id,
          status: true
        });
        await user.save();
      }
    });
    return "Users creation - done";
  } catch (error) {
    return "Users creation - error";
  }
};

const posts = async () => {
  try {
    const listOfLocations = await Location.find({});
    const listOfUsers = await User.find({});
    const louLength = listOfUsers.length - 1;
    const listOfCategories = await Category.find({});
    listOfLocations.forEach(async (loc: UserType) => {
      for (let i = 0; i < randomNumber(20); i++) {
        const usr = listOfUsers[randomNumber(louLength)];
        const post = new Post({
          title: faker.lorem.sentence(),
          problem: faker.lorem.paragraphs(5),
          solution: faker.lorem.paragraphs(2),
          photo: getImage(),
          link: faker.internet.url(),
          location: loc._id,
          category: listOfCategories[randomNumber(listOfCategories.length - 1)],
          createdBy: usr._id,
          votes: [
            listOfUsers[randomNumber(louLength)],
            listOfUsers[randomNumber(louLength)],
            listOfUsers[randomNumber(louLength)]
          ]
        });
        await post.save();
      }
    });
    return "Posts creation - done";
  } catch (error) {
    return "Posts creation - error";
  }
};

const news = async () => {
  try {
    const listOfLocations = await Location.find({});
    listOfLocations.forEach(async (loc: UserType) => {
      for (let i = 0; i < randomNumber(20); i++) {
        const post = new News({
          title: faker.lorem.sentence(),
          text: faker.lorem.paragraphs(5),
          photo: getImage(),
          link: faker.internet.url(),
          location: loc._id,
          pinned: i === 0 ? true : false
        });
        await post.save();
      }
    });
    return "News creation - done";
  } catch (error) {
    return "News creation - error";
  }
};

// ! activate the below
const dbSeed = async () => {
  try {
    // const category = await categories();
    // const location = await locations();
    // const user = await users();
    const post = await posts();
    // const newsPosts = await news();
    return [
      // category,
      // location,
      // user,
      post,
      // newsPosts
    ];
  } catch (error) {
    return error;
  }
};

export default dbSeed;
