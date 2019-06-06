"use strict";
exports.__esModule = true;
var assert = require("assert");
var faker = require("faker");
var MDB = require("./db_connect");
var security_1 = require("./security");
var dbName = "muni";
/**
 * Function to update the database with generated values
 * @function update
 * @param  {object} props - ID of the location and fields with generated value
 * @return {} nothing
 */
var update = function (props) {
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        // assert.equal(null, err);
        var db = MDB.client.db(dbName);
        db.collection("dev")
            .updateOne({
            _id: new MDB.ObjectId(props.id)
        }, { $set: { users: props.fields } }, { upsert: true })
            .then(function (document) {
            console.log(document);
        })["catch"](function (e) {
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
var dbSeed = function (callback) {
    // qty of users
    var users = faker.random.number({
        min: 5,
        max: 10
    });
    // categories
    var categories = [
        'important', 'cat1', 'cat2', 'other'
    ];
    // generate has for password
    security_1.encodeString("1234567", function (encoded) {
        if (!encoded.status) {
            callback({ status: false, message: "Something went wrong", code: 500 });
        }
        else {
            // set the block of data
            var block = [];
            // generate user ids
            var userIds = [];
            for (var i = 0; i < users; i++) {
                userIds.push(new MDB.ObjectId());
            }
            for (var i = 0; i < users; i++) {
                // new user
                var user = {
                    _id: userIds[i],
                    fName: faker.name.firstName(),
                    lName: faker.name.lastName(),
                    avatar: "https://picsum.photos/200/300?random=1",
                    email: faker.internet.email(),
                    pass: encoded.payload,
                    posts: []
                };
                // qty of post per this user
                var posts = faker.random.number({
                    min: 2,
                    max: 5
                });
                for (var n = 0; n < posts; n++) {
                    var createdBy = userIds[Math.floor(Math.random() * userIds.length)];
                    var category = categories[Math.floor(Math.random() * categories.length)];
                    // new post
                    var post = {
                        _id: new MDB.ObjectId(),
                        title: faker.lorem.sentence(),
                        text: faker.lorem.paragraphs(5),
                        photo: "https://picsum.photos/200/300?random=2",
                        link: faker.internet.url(),
                        newsId: new MDB.ObjectId(),
                        createdBy: createdBy,
                        category: category,
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
exports["default"] = dbSeed;
