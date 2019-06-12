"use strict";
exports.__esModule = true;
var assert = require("assert");
var faker = require("faker");
var MDB = require("./db_connect");
var image_1 = require("./image");
var security_1 = require("./security");
/**
 * Function to update the database with generated values
 *
 * @param  {object} props - ID of the location and fields with generated value
 *
 * @return {} nothing
 */
var update = function (props) {
    var dbName = "muni";
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        // assert.equal(null, err);
        var db = MDB.client.db(dbName);
        db.collection("dev")
            .updateOne({
            _id: new MDB.ObjectId(props.id)
        }, {
            $set: {
                users: props.users,
                municipality: props.municipality,
                pinned: props.pinned
            }
        }, { upsert: true })
            .then(function (document) {
            // console.log(document);
        })["catch"](function (e) {
            assert.equal(null, e);
            console.log(e);
        });
    });
};
// create X amount of emails
var emailsArray = function (qty) {
    var result = [];
    for (var i = 0; i < qty; i++) {
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
var buildPost = function (user, createdBy, category) {
    var post = {};
    if (user) {
        post = {
            _id: new MDB.ObjectId(),
            title: faker.lorem.sentence(),
            problem: faker.lorem.paragraphs(5),
            solution: faker.lorem.paragraphs(2),
            photo: image_1["default"],
            link: faker.internet.url(),
            newsId: new MDB.ObjectId(),
            createdBy: createdBy,
            category: category,
            date: faker.date.between("2019-01-01", "2019-05-15"),
            status: "active",
            votes: emailsArray(faker.random.number({
                min: 0,
                max: 500
            }))
        };
    }
    else {
        post = {
            _id: new MDB.ObjectId(),
            title: faker.lorem.sentence(),
            text: faker.lorem.paragraphs(5),
            photo: image_1["default"],
            link: faker.internet.url(),
            date: faker.date.between("2019-01-01", "2019-05-15"),
            status: "active",
            up: emailsArray(faker.random.number({
                min: 0,
                max: 500
            })),
            down: emailsArray(faker.random.number({
                min: 0,
                max: 500
            }))
        };
    }
    return post;
};
/**
 * Function to generate values
 *
 * @param {function} - If enabled at the end of the function, returns generated data through callback
 */
var dbSeed = function (callback) {
    // qty of users
    var users = faker.random.number({
        min: 5,
        max: 10
    });
    // categories
    var categories = [
        "5cfd32f3458cd06becd28315",
        "5cfd335e458cd06becd28316",
        "5cfd33a3458cd06becd28317",
        "5cfd33d2458cd06becd28318"
    ];
    var languages = ["en", "עב"];
    // generate hash for password
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
                    avatar: image_1["default"],
                    email: faker.internet.email(),
                    language: languages[Math.floor(Math.random() * languages.length)],
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
                    var category = new MDB.ObjectId(categories[Math.floor(Math.random() * categories.length)]);
                    // new post
                    var post = buildPost(true, createdBy, category);
                    user.posts.push(post);
                }
                // push the user to data
                block.push(user);
            }
            // create municipality records
            var blockMuni = [];
            var municipalityPosts = faker.random.number({
                min: 2,
                max: 4
            });
            for (var n = 0; n < municipalityPosts; n++) {
                var post = buildPost();
                blockMuni.push(post);
            }
            var pinned = buildPost();
            // ! call to update the DB
            update({
                id: "5ce589a00a61b5a9ca9d9caf",
                users: block,
                municipality: blockMuni,
                pinned: pinned
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
