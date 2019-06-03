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
  // generate has for password
  encodeString("1234567", (encoded: TYPE.intApiResponseTYPE) => {
    if (!encoded.status) {
      callback({ status: false, message: "Something went wrong", code: 500 });
    } else {
      // set the block of data
      let block = [];
      for (let i = 0; i < users; i++) {
        // new user
        const user: any = {
          _id: new MDB.ObjectId(),
          fName: faker.name.firstName(),
          lName: faker.name.lastName(),
          avatar: "https://picsum.photos/200/300?random=1",
          email: faker.internet.email(),
          pass: encoded.payload,
          posts: []
        };
        // qty of post per this user
        const posts = faker.random.number({
          min: 4,
          max: 20
        });
        for (let n = 0; n < posts; n++) {
          // new post
          const post: any = {
            _id: new MDB.ObjectId(),
            title: faker.lorem.sentence(),
            text: faker.lorem.paragraphs(5),
            photo: "https://picsum.photos/200/300?random=2",
            link: faker.internet.url(),
            newsId: new MDB.ObjectId(),
            createdBy: user._id,
            date: faker.date.between("2019-01-01", "2019-05-15"),
            status: "active",
            votes: {
              up: faker.random.number(),
              down: faker.random.number()
            }
          };
          console.log(post);
          // push the post to user
          user.posts.push(post);
        }
        // push the user to data
        block.push(user);
      }
      // ! call to update the DB
      update({
        id: "5ce44caad0d0d7ee3c1e6ae6",
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
