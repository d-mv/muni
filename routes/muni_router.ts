const express = require("express");
import * as dotenv from "dotenv";

import * as UserController from "../controllers/user_controller";

import { cookieFactory } from "../modules/security";
import { apiResponse } from "../src/types";

const router = express.Router();

const dotEnv = dotenv.config();
let token = "";
let options = {
  expire: "",
  httpOnly: false,
  secure: false
};

let replyCache: any = {
  check: { time: new Date(), req: "", reply: {} },
  // create: { time: new Date(), req: "" },
  login: { time: new Date(), req: "", reply: {} },
  update: { time: new Date(), req: "", reply: {} },
  data: { time: new Date(), req: "", reply: {} }
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

router.get("/login", (req: any, res: any, next: any) => {
  // information
  console.log(`§ muni logging in: ${req.query}`);
  // showRequest("usr.login", req.headers, [req.body, req.headers]);

  if (double("login", req.query, 60)) {
    console.log("~> consider double");
    res.status(replyCache["login"].reply.code).send(replyCache["login"].reply);
  } else {
    UserController.muniLogin(
      {
        query: req.query
      },
      (controllerResponse: apiResponse) => {
        console.log("controllerResponse");
        console.log(controllerResponse);
        if (controllerResponse.status) {
          // process token/cookie
          const cookieIngredients = {
            code: controllerResponse.code,
            status: controllerResponse.status,
            message: controllerResponse.message,
            payload: {
              _id: controllerResponse.payload._id
            }
          };
          const response: any = cookieFactory(cookieIngredients);
          const packageToSend = {
            code: response.code,
            message: response.message.message,
            status: response.message.status,
            token: response.token,
            payload: {
              ...controllerResponse.payload
            }
          };
          caching("login", req.query, packageToSend);
          res.status(response.code).send(packageToSend);
        } else {
          caching("login", req.query, controllerResponse);
          res.status(controllerResponse.code).send(controllerResponse);
        }
      }
    );
  }
});


export default router;
