"use strict";
exports.__esModule = true;
var faker_1 = require("faker");
var mongodb_1 = require("mongodb");
var MDB = require("./db_connect");
var dbName = "muni";
/** Function to update the database with generated values
 * @function update
 * @param  {object} props - ID of the location and fields with generated value
 * @return {} nothing
 */
var update = function (props) {
    MDB.client.connect(function (err) {
        // assert.equal(null, err);
        var db = MDB.client.db(dbName);
        db.collection("dev")
            .updateOne({
            _id: new MDB.ObjectID(props.id)
        }, { $set: { users: props.fields } }, { upsert: true })
            .then(function (document) {
            console.log(document);
        })["catch"](function (e) {
            console.log(e);
        });
    });
};
/** Function to generate values
 * @function fake
 * @return {} - Returns generated data through callback
 */
var dbSeed = function (callback) {
    // qty of users
    var users = faker_1["default"].random.number({
        min: 3,
        max: 10
    });
    // set the block of data
    var block = [];
    for (var i = 0; i < users; i++) {
        // new user
        var user = {
            _id: new mongodb_1["default"].ObjectID(),
            fName: faker_1["default"].name.firstName(),
            lName: faker_1["default"].name.lastName(),
            email: faker_1["default"].internet.email(),
            pass: 1234567,
            posts: []
        };
        // qty of post per this user
        var posts = faker_1["default"].random.number({
            min: 4,
            max: 50
        });
        for (var n = 0; n < posts; n++) {
            // new post
            var post = {
                id: new mongodb_1["default"].ObjectID(),
                title: faker_1["default"].lorem.sentence,
                text: faker_1["default"].lorem.paragraphs(5),
                photo: "https://picsum.photos/200/300?random=1",
                link: faker_1["default"].internet.url,
                newsId: new mongodb_1["default"].ObjectID(),
                createdBy: new mongodb_1["default"].ObjectID(),
                date: faker_1["default"].date.between("2019-01-01", "2019-05-15"),
                status: "active",
                votes: {
                    up: faker_1["default"].random.number(),
                    down: faker_1["default"].random.number()
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
exports["default"] = dbSeed;
