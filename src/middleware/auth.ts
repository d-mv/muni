import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

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
    res.status(401).send({ error: "Please authenticate!" });
  }
};

// const authDirect = async (token: string) => {
//   console.log(token)
//   try {
//     const decoded: any = jwt.verify(token, secret);
//     console.log(decoded)
//     const user = await User.findOne({
//       _id: decoded._id,
//       "tokens.token": token
//     });

//     if (!user) {
//       throw new Error();
//     }

//     return { status: true, _id: decoded._id };
//   } catch (error) {
//     return { status: false };
//   }
// };

module.exports = auth
