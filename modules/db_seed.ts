import * as assert from "assert";
import * as faker from "faker";
import * as mongodb from "mongodb";
import * as MDB from "./db_connect";

import imagesArray from "./image";
import { encodeString } from "./security";
import { ObjectId } from "bson";

import * as TYPE from "../src/types";

/**
 * Function to return a random image in base64
 * @function getImage
 * @returns {string}
 */
const getImage = () => {
  const index = faker.random.number({
    min: 0,
    max: imagesArray.length - 1
  });
  return imagesArray[index];
};

/**
 * Function to update the database with generated values
 *
 * @param  {object} props - ID of the location and fields with generated value
 *
 * @return {} nothing
 */
const update = (props: {
  id: string;
  users: any;
  municipality: any;
  pinned: any;
}) => {
  const dbName = "muni";
  MDB.client.connect(err => {
    assert.equal(null, err);
    // assert.equal(null, err);
    const db: any = MDB.client.db(dbName);
    db.collection("dev")
      .updateOne(
        {
          _id: new MDB.ObjectId(props.id)
        },
        {
          $set: {
            users: props.users,
            municipality: props.municipality,
            pinned: props.pinned
          }
        },
        { upsert: true }
      )
      .then((document: any) => {
        // console.log(document);
      })
      .catch((e: any) => {
        assert.equal(null, e);
        console.log(e);
      });
  });
};

let userIds: any[] = [];

// build array with X amount of Ids
const idsArray = (qty: number) => {
  let result = [];
  for (let i = 0; i < qty; i++) {
    result.push(
      userIds[
        faker.random.number({
          min: 0,
          max: 4
        })
      ]
    );
  }
  return result;
};

const replyOrNotReply = () => {
  const yesNo = faker.random.number({
    min: 0,
    max: 1
  });
  const paragraphs = faker.random.number({
    min: 1,
    max: 2
  });
  const reply = yesNo ? faker.lorem.paragraphs(paragraphs) : null;
  return reply;
};

/**
 * Function to create posts, both petitions and municipality news
 *
 * @param {boolean} user - If this is a petition
 * @param {ObjectId} createdBy - Creator's ID
 * @param {ObjectId} category - Category's ID
 *
 * @returns {Array} - Array of generated posts
 */
const buildPost = (
  user?: boolean,
  createdBy?: ObjectId,
  category?: ObjectId
) => {
  let post = {};
  if (user) {
    post = {
      _id: new MDB.ObjectId(),
      title: faker.lorem.sentence(),
      problem: faker.lorem.paragraphs(5),
      solution: faker.lorem.paragraphs(2),
      photo: getImage(),
      link: faker.internet.url(),
      newsId: new MDB.ObjectId(),
      createdBy,
      category,
      date: faker.date.between("2019-01-01", "2019-05-15"),
      status: "active",
      votes: idsArray(
        faker.random.number({
          min: 0,
          max: 4
        })
      ),
      reply: {
        text: replyOrNotReply() || "",
        date: new Date(),
        up: idsArray(
          faker.random.number({
            min: 0,
            max: 4
          })
        ),
        down: idsArray(
          faker.random.number({
            min: 0,
            max: 4
          })
        )
      }
    };
  } else {
    post = {
      _id: new MDB.ObjectId(),
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraphs(5),
      photo: getImage(),
      link: faker.internet.url(),
      date: faker.date.between("2019-01-01", "2019-05-15"),
      status: "active"
    };
  }
  return post;
};

/**
 * Function to generate values
 *
 * @param {function} - If enabled at the end of the function, returns generated data through callback
 */
const dbSeed = (callback: any) => {
  // qty of users
  const users = 5;
  //   faker.random.number({
  //   min: 5,
  //   max: 10
  // });
  // categories
  const categories = [
    "5d0515f6765ce120e4bdf6a8",
    "5d051619765ce120e4bdf6ab",
    "5d051627765ce120e4bdf6ac",
    "5d05160d765ce120e4bdf6aa",
    "5d051602765ce120e4bdf6a9"
  ];
  const languages = ["en", "עב"];

  // generate hash for password
  encodeString("1234567", (encoded: TYPE.intApiResponseTYPE) => {
    if (!encoded.status) {
      callback({ status: false, message: "Something went wrong", code: 500 });
    } else {
      // set the block of data
      let block = [];
      // generate user ids
      // let userIds = [];
      for (let i = 0; i < users; i++) {
        userIds.push(new MDB.ObjectId());
      }

      for (let i = 0; i < users; i++) {
        // new user
        const user: any = {
          _id: userIds[i],
          fName: faker.name.firstName(),
          lName: faker.name.lastName(),
          email: faker.internet.email(),
          language: languages[Math.floor(Math.random() * languages.length)],
          pass: encoded.payload,
          type: "user",
          posts: []
        };
        // qty of post per this user
        const posts = faker.random.number({
          min: 1,
          max: 3
        });

        for (let n = 0; n < posts; n++) {
          const createdBy = userIds[Math.floor(Math.random() * userIds.length)];
          const category = new MDB.ObjectId(
            categories[Math.floor(Math.random() * categories.length)]
          );
          // new post
          const post = buildPost(true, createdBy, category);
          user.posts.push(post);
        }
        // push the user to data
        block.push(user);
      }
      // create muni user
      const muniUser: any = {
        _id: new MDB.ObjectId(),
        fName: faker.name.firstName(),
        lName: faker.name.lastName(),
        email: faker.internet.email(),
        language: languages[Math.floor(Math.random() * languages.length)],
        pass: encoded.payload,
        type: "muni",
        posts: []
      };

      block.push(muniUser);

      // create municipality records
      let blockMuni = [];
      const municipalityPosts = faker.random.number({
        min: 3,
        max: 10
      });

      for (let n = 0; n < municipalityPosts; n++) {
        const post = buildPost();
        blockMuni.push(post);
      }

      const pinned = blockMuni[2];

      // ! call to update the DB
      update({
        id: "5d04f0f698de3fce481f0e3f",
        users: block,
        municipality: blockMuni,
        pinned
      });

      // report
      callback({
        status: true,
        message: "Seeding data is sent to DB.",
        code: 200
      });
    }
  });
};

export default dbSeed;
