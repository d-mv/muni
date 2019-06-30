const express = require("express");

import { checkUserById } from "../controllers/index";
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

export default router;
