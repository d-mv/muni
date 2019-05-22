const express = require("express");

import { checkToken } from "../modules/security";
import * as User from "../models/user_model";
import dbSeed from "../modules/db_seed";
import { encodeString } from "../modules/security";
const router = express.Router();

// ! seed the db with users/posts
router.get("/fake", (req: any, res: any, next: any) => {
  dbSeed((resp: any) => {
    res.send(resp);
  });
});

router.get("/cookie/:id", (req: any, res: any, next: any) => {
  console.log(req.headers);
  console.log(req.params);
  // check if token is present
//   if (!req.headers.token) {
//     // if not present, clear cookies and send code/message
//     res
//       .cookie("token", "", {
//         expire: "",
//         httpOnly: false,
//         secure: false
//       })
//       .status(400)
//       .send({ status: false, message: "Token is missing" });
//   } else {
//     // token is present
//     // check if token valid
//     checkToken(req.headers.token, (checkTokenResponse: any, id: string) => {
//       console.log(id);
//       // reassign code
//       const code = checkTokenResponse.code;
//       delete checkTokenResponse.code;
//       // check if code is not positive
//       if (checkTokenResponse.code !== 200) {
//         // clear cookies
//         // res.cookie("token", token, options);
//       }
//       User.isUserSuper(req.params.id, id, (response: boolean) => {

// console.log(response === null);
//       })


//       console.log("haha");
//       // console.log(haha);
//       // send code/message
//       res.status(code).send(checkTokenResponse);
//     });
  // }
});

// rest
router.get("/*", (req: any, res: any, next: any) => {
  console.log(res);
  res.send();
});

export default router;
