import faker from "faker";
import mongo from "mongodb";
import * as MDB from "./db_connect";
const dbName = "muni";

/** Function to update the database with generated values
 * @function update
 * @param  {object} props - ID of the location and fields with generated value
 * @return {} nothing
 */
const update = (props: { id: string; fields: any }) => {
  MDB.client.connect(err => {
    // assert.equal(null, err);
    const db: any = MDB.client.db(dbName);
    db.collection("dev")
      .updateOne(
        {
          _id: new MDB.ObjectID(props.id)
        },
        { $set: { users: props.fields } },
        { upsert: true }
      )
      .then((document: any) => {
        console.log(document);
      })
      .catch((e: any) => {
        console.log(e);
      });
  });
};

/** Function to generate values
 * @function fake
 * @return {} - Returns generated data through callback
 */
const dbSeed = (callback: any) => {
  // qty of users
  const users = faker.random.number({
    min: 3,
    max: 10
  });
  // set the block of data
  let block = [];
  for (let i = 0; i < users; i++) {
    // new user
    const user: any = {
      _id: new mongo.ObjectID(),
      fName: faker.name.firstName(),
      lName: faker.name.lastName(),
      email: faker.internet.email(),
      pass: 1234567,
      posts: []
    };
    // qty of post per this user
    const posts = faker.random.number({
      min: 4,
      max: 50
    });
    for (let n = 0; n < posts; n++) {
      // new post
      const post: any = {
        id: new mongo.ObjectID(),
        title: faker.lorem.sentence,
        text: faker.lorem.paragraphs(5),
        photo: "https://picsum.photos/200/300?random=1",
        link: faker.internet.url,
        newsId: new mongo.ObjectID(),
        createdBy: new mongo.ObjectID(),
        date: faker.date.between("2019-01-01", "2019-05-15"),
        status: "active",
        votes: {
          up: faker.random.number(),
          down: faker.random.number()
        }
      };
      // push the post to user
      user.posts.push(post);
    }
    // push the user to data
    block.push(user);
  }
  // ! call to update the DB
  // update({
  //   id: "5ce03513451847a32483c5bas",
  //   fields: block
  // });
  // return the data
  callback({ users: block });
};

export default dbSeed;
