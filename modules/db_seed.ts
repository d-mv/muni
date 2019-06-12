import * as assert from "assert";
import * as faker from "faker";
import * as mongodb from "mongodb";
import * as MDB from "./db_connect";

import image from "./image";
import { encodeString } from "./security";
import { ObjectId } from "bson";

import * as TYPE from "../src/types";

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

// create X amount of emails
const emailsArray = (qty: number) => {
  let result = [];
  for (let i = 0; i < qty; i++) {
    result.push(faker.internet.email());
  }
  return result;
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
      photo: image,
      link: faker.internet.url(),
      newsId: new MDB.ObjectId(),
      createdBy,
      category,
      date: faker.date.between("2019-01-01", "2019-05-15"),
      status: "active",
      votes: emailsArray(
        faker.random.number({
          min: 0,
          max: 500
        })
      )
    };
  } else {
    post = {
      _id: new MDB.ObjectId(),
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraphs(5),
      photo: image,
      link: faker.internet.url(),
      date: faker.date.between("2019-01-01", "2019-05-15"),
      status: "active",
      up: emailsArray(
        faker.random.number({
          min: 0,
          max: 500
        })
      ),
      down: emailsArray(
        faker.random.number({
          min: 0,
          max: 500
        })
      )
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
  const users = faker.random.number({
    min: 5,
    max: 10
  });
  // categories
  const categories = [
    "5cfd32f3458cd06becd28315",
    "5cfd335e458cd06becd28316",
    "5cfd33a3458cd06becd28317",
    "5cfd33d2458cd06becd28318"
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
      let userIds = [];
      for (let i = 0; i < users; i++) {
        userIds.push(new MDB.ObjectId());
      }

      for (let i = 0; i < users; i++) {
        // new user
        const user: any = {
          _id: userIds[i],
          fName: faker.name.firstName(),
          lName: faker.name.lastName(),
          avatar: image,
          email: faker.internet.email(),
          language: languages[Math.floor(Math.random() * languages.length)],
          pass: encoded.payload,
          posts: []
        };
        // qty of post per this user
        const posts = faker.random.number({
          min: 2,
          max: 5
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
      // create municipality records
      let blockMuni = [];
      const municipalityPosts = faker.random.number({
        min: 2,
        max: 4
      });

      for (let n = 0; n < municipalityPosts; n++) {
        const post = buildPost();
        blockMuni.push(post);
      }

      const pinned = buildPost();

      // ! call to update the DB
      update({
        id: "5ce589a00a61b5a9ca9d9caf",
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
