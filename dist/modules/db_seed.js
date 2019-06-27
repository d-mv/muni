"use strict";
exports.__esModule = true;
var assert = require("assert");
var faker = require("faker");
var MDB = require("./db_connect");
var image_1 = require("./image");
var security_1 = require("./security");
/**
 * Function to return a random image in base64
 * @function getImage
 * @returns {string}
 */
var getImage = function () {
    var index = faker.random.number({
        min: 0,
        max: image_1["default"].length - 1
    });
    return image_1["default"][index];
};
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
                pinned: props.pinned,
                admins: props.admins
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
var userIds = [];
// build array with X amount of Ids
var idsArray = function (qty) {
    var result = [];
    for (var i = 0; i < qty; i++) {
        result.push(userIds[faker.random.number({
            min: 0,
            max: 4
        })]);
    }
    return result;
};
var replyOrNotReply = function () {
    var yesNo = faker.random.number({
        min: 0,
        max: 1
    });
    var paragraphs = faker.random.number({
        min: 1,
        max: 2
    });
    var reply = yesNo ? faker.lorem.paragraphs(paragraphs) : null;
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
var buildPost = function (user, createdBy, category) {
    var post = {};
    if (user) {
        post = {
            _id: new MDB.ObjectId(),
            title: faker.lorem.sentence(),
            problem: faker.lorem.paragraphs(5),
            solution: faker.lorem.paragraphs(2),
            photo: getImage(),
            link: faker.internet.url(),
            newsId: new MDB.ObjectId(),
            createdBy: createdBy,
            category: category,
            date: faker.date.between("2019-01-01", "2019-05-15"),
            status: "active",
            votes: idsArray(faker.random.number({
                min: 0,
                max: 4
            })),
            reply: {
                text: replyOrNotReply() || "",
                date: new Date(),
                up: idsArray(faker.random.number({
                    min: 0,
                    max: 4
                })),
                down: idsArray(faker.random.number({
                    min: 0,
                    max: 4
                }))
            }
        };
    }
    else {
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
var dbSeed = function (callback) {
    // qty of users
    var users = 5;
    // categories
    var categories = [
        "5d0515f6765ce120e4bdf6a8",
        "5d051619765ce120e4bdf6ab",
        "5d051627765ce120e4bdf6ac",
        "5d05160d765ce120e4bdf6aa",
        "5d051602765ce120e4bdf6a9"
    ];
    var languages = ["en", "עב", "ع"];
    // generate hash for password
    security_1.encodeString("1234567", function (encoded) {
        if (!encoded.status) {
            callback({ status: false, message: "Something went wrong", code: 500 });
        }
        else {
            // set the block of data
            var block = [];
            // generate user ids
            for (var i = 0; i < users; i++) {
                userIds.push(new MDB.ObjectId());
            }
            for (var i = 0; i < users; i++) {
                // new user
                var user = {
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
                var posts = faker.random.number({
                    min: 1,
                    max: 3
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
            // create muni user
            var muniUser = {
                _id: new MDB.ObjectId(),
                fName: faker.name.firstName(),
                lName: faker.name.lastName(),
                email: "user@muni.com",
                language: languages[Math.floor(Math.random() * languages.length)],
                pass: encoded.payload,
                type: "muni",
                posts: []
            };
            // create municipality records
            var blockMuni = [];
            var municipalityPosts = faker.random.number({
                min: 3,
                max: 10
            });
            for (var n = 0; n < municipalityPosts; n++) {
                var post = buildPost();
                blockMuni.push(post);
            }
            var pinned = blockMuni[2];
            // ! call to update the DB
            update({
                id: "5ce2a3c945e5451171394b35",
                users: block,
                municipality: blockMuni,
                pinned: pinned,
                admins: [muniUser]
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
