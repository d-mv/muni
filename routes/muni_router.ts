const express = require("express");
import * as dotenv from "dotenv";

import * as UserController from "../controllers/user_controller";
import * as PostController from "../controllers/post_controller";

import { cookieFactory } from "../modules/security";
import { apiResponse } from "../src/types";
import { showRequest } from 'modules/show_request';

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
  login: { time: new Date(), req: "", reply: {} },
  create: { time: new Date(), req: "", reply: {} },
  update: { time: new Date(), req: "", reply: {} },
  delete: { time: new Date(), req: "", reply: {} }
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

router.patch("/:id", (req: any, res: any, next: any) => {
  // information
  console.log(`§ update post...`);
  // showRequest("lcn.check", req.headers, [req.body, req.headers.token]);

  // if (double("update", req.body, 600)) {
  //   console.log("~> consider double");
  //   res
  //     .status(replyCache["update"].reply.code)
  //     .send(replyCache["update"].reply);
  // } else {
    const request = { token: req.headers.token, location:req.params.id, post: req.body.post };
    PostController.updateMuniPost(request, (controllerResponse: apiResponse) => {
      caching("update", req.body, controllerResponse);
      res.status(controllerResponse.code).send(controllerResponse);
    });
  // }
});
router.put("/:id", (req: any, res: any, next: any) => {
  // information
  console.log(`§ delete muni post...`);
  // showRequest("lcn.check", req.query, ['',req.params.id]);

  // if (double("update", req.body, 600)) {
  //   console.log("~> consider double");
  //   res
  //     .status(replyCache["update"].reply.code)
  //     .send(replyCache["update"].reply);
  // } else {
    const request = {
      token: req.headers.token,
      location: req.params.id,
      post: req.body.post
    };
    PostController.deleteMuniPost(request, (controllerResponse: apiResponse) => {
      caching("delete", req.body, controllerResponse);
      res.status(controllerResponse.code).send(controllerResponse);
    });
  // }
});



router.post("/create", (req: any, res: any, next: any) => {
  // information
  console.log(`§ create muni post...`);
  // showRequest("lcn.check", req.headers, [req.body, req.headers]);

  if (double("create", req.body, 600)) {
    console.log("~> consider double");
    res
      .status(replyCache["create"].reply.code)
      .send(replyCache["create"].reply);
  } else {
    PostController.createMuni(req.body, (controllerResponse: apiResponse) => {
      caching("create", req.body, controllerResponse);
      res.status(controllerResponse.code).send(controllerResponse);
    });
  }
});

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
