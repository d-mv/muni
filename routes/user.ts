const express = require("express");

import { checkUserById, login } from "../controllers/index";
import { apiResponse } from "../src/types";
import * as Message from "../modules/response_message";
const router = express.Router();

let replyCache: any = {
  check: { time: new Date(), req: "", reply: {} },
  login: { time: new Date(), req: "", reply: {} }
};

// storing
const caching = (cacheId: string, req: any, reply: any) => {
  const time = new Date();
  replyCache[cacheId] = { time, req, reply };
};

// check if request is double
const double = (cacheId: string, req: any, time: number) => {
  const cache = replyCache[cacheId];
  const last: any = cache.time;
  const now: any = new Date();
  const diff = now - last;

  let reply = diff < 1000 * time && cache.reply !== "" && req === cache.req;

  if (typeof req === "object" && cache.req != "") {
    const cachedLength = Object.keys(cache.req).length;
    const reqLength = Object.keys(req).filter(
      key => req[key] === cache.req[key]
    ).length;

    reply = diff < 1000 * time && cachedLength === reqLength;
  }

  return reply;
};

// headers.token
router.get("/check", (req: any, res: any, next: any) => {
  console.log(">> checking token: " + req.headers.token);
  if (double("check", req.headers.token, 5)) {
    console.log("~> consider double");
    const { status, message, payload } = replyCache["check"].reply;
    res.status(replyCache["check"].reply.code).send({
      status: status,
      message: message,
      payload: payload
    });
  } else {
    checkUserById(req.headers.token, (rsp: apiResponse) => {
      caching("check", req.headers.token, rsp);
      res.status(rsp.code).send({
        status: rsp.status,
        message: rsp.message,
        payload: rsp.payload
      });
    });
  }
});

router.get("/user/login", (req: any, res: any, next: any) => {
  console.log(">> loggin in: ");
  console.log(req.query);
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
