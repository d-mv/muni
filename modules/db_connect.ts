import * as mongodb from "mongodb";
import * as dotenv from "dotenv";

const dotEnv = dotenv.config()

const MongoClient = mongodb.MongoClient
const connectUrl = `${process.env.MONGO_URL ||
  "mongodb://localhost:27017"}?useNewUrlParser=true`;
// const connectUrl = `${process.env.MONGO_URL || 'mongodb://localhost:27017'}?retryWrites=true`
const client = new MongoClient(connectUrl, { useNewUrlParser: true, connectTimeoutMS: 30000, reconnectTries: 30, reconnectInterval: 5000 });
const ObjectId = mongodb.ObjectID;

export { client, ObjectId }