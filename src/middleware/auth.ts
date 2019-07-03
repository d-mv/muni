import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

const User = require("../models/user");

const dotEnv = dotenv.config();
const secret: any = process.env.SECRET;

const auth = async (req: any, res: any, next: any) => {
  try {
    const token = req
      .header("Authorization")
      .replace("Bearer", "")
      .trim();

    const decoded: any = jwt.verify(token, secret);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticate!" });
  }
};

module.exports = auth;
