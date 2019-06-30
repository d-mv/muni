const express = require("express");

import { checkUserById, login } from "../controllers/index";
import { apiResponse } from "../src/types";

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
  console.log(">> loggin in: " + req.query);
  console.log(req.query);
  login(req.query, (rsp: apiResponse) =>
    res
      .status(rsp.code)
      .send({ status: rsp.status, message: rsp.message, payload: rsp.payload })
  );
});

export default router;
