const express = require("express");

import { checkUserById, login } from "../controllers/index";
import { apiResponse } from "../src/types";
import * as Message from "../modules/response_message";
const router = express.Router();

// headers.token
router.get("/check", (req: any, res: any, next: any) => {
  console.log(">> checking token: " + req.headers.token);
  checkUserById(req.headers.token, (rsp: apiResponse) =>
    res
      .status(rsp.code)
      .send({ status: rsp.status, message: rsp.message, payload: rsp.payload })
  );
});

router.get("/user/login", (req: any, res: any, next: any) => {
  console.log(">> loggin in: ");
  if (
    typeof req.query.email === "undefined" ||
    typeof req.query.password === "undefined"
  ) {
    res.status(400).send(Message.requestError("Missing email/password"));
  } else {
    login(req.query, (rsp: apiResponse) =>
      res.status(rsp.code).send({
        status: rsp.status,
        message: rsp.message,
        payload: rsp.payload
      })
    );
  }
});

export default router;
