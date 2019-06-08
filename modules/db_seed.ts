import * as assert from "assert";
import * as faker from "faker";
import * as mongodb from "mongodb";
import * as MDB from "./db_connect";

import { encodeString } from "./security";
import * as TYPE from "../src/types";
const dbName = "muni";

/**
 * Function to update the database with generated values
 * @function update
 * @param  {object} props - ID of the location and fields with generated value
 * @return {} nothing
 */
const update = (props: { id: string; fields: any }) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    // assert.equal(null, err);
    const db: any = MDB.client.db(dbName);
    db.collection("dev")
      .updateOne(
        {
          _id: new MDB.ObjectId(props.id)
        },
        { $set: { users: props.fields } },
        { upsert: true }
      )
      .then((document: any) => {
        console.log(document);
      })
      .catch((e: any) => {
        assert.equal(null, e);
        console.log(e);
      });
  });
};

/**
 * Function to generate values
 * @function fake
 * @callback - If enabled, returns generated data through callback
 */
const dbSeed = (callback: any) => {
  // qty of users
  const users = faker.random.number({
    min: 5,
    max: 10
  });
  // categories
  const categories = ["important", "cat1", "cat2", "other"];
  const languages = ["en", "עב"];

  // generate has for password
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
          avatar: "https://picsum.photos/200/300?random=1",
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
          const category =
            categories[Math.floor(Math.random() * categories.length)];
          // new post
          const post: any = {
            _id: new MDB.ObjectId(),
            title: faker.lorem.sentence(),
            text: faker.lorem.paragraphs(5),
            photo: "https://picsum.photos/200/300?random=2",
            link: faker.internet.url(),
            newsId: new MDB.ObjectId(),
            createdBy,
            category,
            date: faker.date.between("2019-01-01", "2019-05-15"),
            status: "active",
            votes: faker.random.number()
          };
          // console.log(post);
          // push the post to user
          user.posts.push(post);
        }
        // push the user to data
        block.push(user);
      }
      // ! call to update the DB
      update({
        id: "5ce2a3c945e5451171394b35",
        fields: block
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
