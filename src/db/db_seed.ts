import * as faker from "faker";
import imagesArray from "./images";
import { LocationType } from "../models/location";
import { PostType } from "../models/post";
import { UserType } from "./../models/user";

const Location = require("../models/location");
const User = require("../models/user");
const Post = require("../models/post");

const getImage = () => {
  const index = faker.random.number({
    min: 0,
    max: imagesArray.length - 1
  });
  return imagesArray[index];
};

const locations = () => {
  const Haifa = new Location({
    name: {
      עב: "חיפה",
      ع: "حيفا‎",
      en: "Haifa"
    }
  }); Haifa.save;
};

const users = () => {
  const listOfLocations = Location.find({});
  listOfLocations.map((loc: LocationType) => {
    for (let i = 0; i++; i === 5) {
      const user = new User({
        pass: "1234567",
        fName: faker.name.firstName(),
        lName: faker.name.lastName(),
        email: faker.internet.email(),
        location: loc._id
      });
      user.save;
    }
  });
};

const posts = () => {
  const listOfUsers = User.find({});
  listOfUsers.map((usr: UserType) => {
    for (let i = 0; i++; i === 5) {
      const post = new Post({
        title: faker.lorem.sentence(),
        problem: faker.lorem.paragraphs(5),
        solution: faker.lorem.paragraphs(2),
        photo: getImage(),
        link: faker.internet.url(),
        location: usr.location,
        category: "5d1e28fd0572676eca82290b"
      })
        post.save;
    }
  });
};

const dbSeed = () => {
  locations();
  users();
  posts();
};

// const update = (props: {
//   id: string;
//   users: any;
//   municipality: any;
//   pinned: any;
//   admins: any[];
// }) => {};

// let userIds: any[] = [];

// const replyOrNotReply = () => {
//   const yesNo = faker.random.number({
//     min: 0,
//     max: 1
//   });
//   const paragraphs = faker.random.number({
//     min: 1,
//     max: 2
//   });
//   const reply = yesNo ? faker.lorem.paragraphs(paragraphs) : null;
//   return reply;
// };

// /**
//  * Function to create posts, both petitions and municipality news
//  *
//  * @param {boolean} user - If this is a petition
//  * @param {ObjectId} createdBy - Creator's ID
//  * @param {ObjectId} category - Category's ID
//  *
//  * @returns {Array} - Array of generated posts
//  */
// const buildPost = (
//   user?: boolean,
//   createdBy?: ObjectId,
//   category?: ObjectId
// ) => {
//   let post = {};
//   const replyOr = replyOrNotReply();
//   if (user) {
//     post = {
//       _id: new MDB.ObjectId(),
//       title: faker.lorem.sentence(),
//       problem: faker.lorem.paragraphs(5),
//       solution: faker.lorem.paragraphs(2),
//       photo: getImage(),
//       link: faker.internet.url(),
//       newsId: new MDB.ObjectId(),
//       createdBy,
//       category,
//       date: faker.date.between("2019-01-01", "2019-05-15"),
//       status: "active",
//       votes: idsArray(
//         faker.random.number({
//           min: 0,
//           max: 4
//         })
//       ),
//       reply: {
//         text: replyOr ? replyOr : "",
//         date: new Date(),
//         up: replyOr
//           ? idsArray(
//               faker.random.number({
//                 min: 0,
//                 max: 4
//               })
//             )
//           : [],
//         down: replyOr
//           ? idsArray(
//               faker.random.number({
//                 min: 0,
//                 max: 4
//               })
//             )
//           : []
//       }
//     };
//   } else {
//     post = {
//       _id: new MDB.ObjectId(),
//       title: faker.lorem.sentence(),
//       text: faker.lorem.paragraphs(5),
//       photo: getImage(),
//       link: faker.internet.url(),
//       date: faker.date.between("2019-01-01", "2019-05-15"),
//       status: "active"
//     };
//   }
//   return post;
// };

// /**
//  * Function to generate values
//  *
//  * @param {function} - If enabled at the end of the function, returns generated data through callback
//  */
// const dbSeed = (callback: any) => {
//   // qty of users
//   const users = 5;
//   // categories
//   const categories = [
//     "5d0515f6765ce120e4bdf6a8",
//     "5d051619765ce120e4bdf6ab",
//     "5d051627765ce120e4bdf6ac",
//     "5d05160d765ce120e4bdf6aa",
//     "5d051602765ce120e4bdf6a9"
//   ];
//   const languages = ["en", "עב", "ع"];

//   // generate hash for password
//   encodeString("1234567", (encoded: TYPE.intApiResponseTYPE) => {
//     if (!encoded.status) {
//       callback({ status: false, message: "Something went wrong", code: 500 });
//     } else {
//       // set the block of data
//       let block = [];
//       // generate user ids
//       for (let i = 0; i < users; i++) {
//         userIds.push(new MDB.ObjectId());
//       }

//       for (let i = 0; i < users; i++) {
//         // new user
//         const user: any = {
//           _id: userIds[i],
//           fName: faker.name.firstName(),
//           lName: faker.name.lastName(),
//           email: faker.internet.email(),
//           language: languages[Math.floor(Math.random() * languages.length)],
//           pass: encoded.payload,
//           type: "user",
//           posts: []
//         };
//         // qty of post per this user
//         const posts = faker.random.number({
//           min: 1,
//           max: 3
//         });

//         for (let n = 0; n < posts; n++) {
//           const createdBy = userIds[Math.floor(Math.random() * userIds.length)];
//           const category = new MDB.ObjectId(
//             categories[Math.floor(Math.random() * categories.length)]
//           );
//           // new post
//           const post = buildPost(true, createdBy, category);
//           user.posts.push(post);
//         }
//         // push the user to data
//         block.push(user);
//       }
//       // create muni user
//       const muniUser: any = {
//         _id: new MDB.ObjectId(),
//         fName: faker.name.firstName(),
//         lName: faker.name.lastName(),
//         email: "user@muni.com",
//         language: languages[Math.floor(Math.random() * languages.length)],
//         pass: encoded.payload,
//         type: "muni",
//         posts: []
//       };

//       // create municipality records
//       let blockMuni = [];
//       const municipalityPosts = faker.random.number({
//         min: 3,
//         max: 10
//       });

//       for (let n = 0; n < municipalityPosts; n++) {
//         const post = buildPost();
//         blockMuni.push(post);
//       }

//       const pinned = blockMuni[2];

//       // ! call to update the DB
//       update({
//         id: "5ce2a3c945e5451171394b35",
//         users: block,
//         municipality: blockMuni,
//         pinned,
//         admins: [muniUser]
//       });

//       // report
//       callback({
//         status: true,
//         message: "Seeding data is sent to DB.",
//         code: 200
//       });
//     }
//   });
// };

export default dbSeed;
