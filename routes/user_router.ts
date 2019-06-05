const express = require("express");
import * as dotenv from "dotenv";

import * as UserController from "../controllers/user_controller";
import * as User from "../models/user_model";

import { checkToken, cookieFactory } from "../modules/security";
import { showRequest } from "../modules/show_request";
import { apiResponse } from "../src/types";

const router = express.Router();

const dotEnv = dotenv.config();
const redirectUrl = process.env.SELF || "httpL//localhost:8080";

// set defaults
let token = "";
let options = {
  expire: "",
  httpOnly: false,
  secure: false
};

let replyCache: any = {
  check: { time: new Date(), req: "", reply: {} },
  // create: { time: new Date(), req: "" },
  login: { time: new Date(), req: "", reply: {} }
  // id: { time: new Date(), req: "" },
  // posts: { time: new Date(), req: "" }
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

// check if token valid
router.get("/check", (req: any, res: any, next: any) => {
  // information
  console.log(`§ checking token: ${req.headers.token ? "present" : "absent"}`);
  // showRequest("usr.check", req.headers, [req.body, req.headers.token]);

  // check if token is present
  if (!req.headers.token) {
    // if not present, clear cookies and send code/message
    res
      .cookie("token", "", {
        expire: "",
        httpOnly: false,
        secure: false
      })
      .status(400)
      .send({
        status: false,
        message: "Token is missing"
      });
  } else {
    // token is present
    if (double("check", req.headers.token, 60)) {
      console.log("~> consider double");
      res
        .status(replyCache["check"].reply.code)
        .send(replyCache["check"].reply);
    } else {
      // check if token valid
      checkToken(req.headers.token, (checkTokenResponse: any) => {
        // reassign code
        const code = checkTokenResponse.code;
        delete checkTokenResponse.code;
        // check if code is not positive
        if (checkTokenResponse.code !== 200) {
          // clear cookies & send code/message
          res.cookie("token", token, options);
        }
        const packageToSend = {
          code: checkTokenResponse.payload.code,
          message: `${checkTokenResponse.message} / ${
            checkTokenResponse.payload.message
          }`,
          status: checkTokenResponse.payload.status,
          payload: checkTokenResponse.payload.payload
        };
        caching("check", req.headers.token, packageToSend);
        res.status(code).send(packageToSend);
      });
    }
  }
});
// create user
router.post("/create", (req: any, res: any, next: any) => {
  console.log("create");
  showRequest("usr.create", req.headers, [req.body, req.headers.token]);

  UserController.create(req.query, (controllerResponse: apiResponse) => {
    if (controllerResponse.status) {
      // created, need to issue token
      console.log("controllerResponse");
      console.log(controllerResponse);
      const response = cookieFactory(controllerResponse);
      res
        .cookie("token", response.token, response.options)
        .status(response.code)
        .send(response.message);
    } else {
      res.status(controllerResponse.code).send(controllerResponse);
    }
  });
});
// login
router.get("/login", (req: any, res: any, next: any) => {
  // information
  console.log(`§ logging in: ${req.query}`);
  // showRequest("usr.login", req.headers, [req.body, req.headers]);
  // const dbl = double("login", req.query, 60);
  // console.log(req.query);
  // console.log(dbl)
  // console.log(replyCache["login"]);
  if (double("login", req.query, 60)) {
    console.log("~> consider double");
    res.status(replyCache["login"].reply.code).send(replyCache["login"].reply);
  } else {
    UserController.login(
      {
        query: req.query
      },
      (controllerResponse: apiResponse) => {
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
          const response = cookieFactory(cookieIngredients);

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
// get user
router.get("/:id", (req: any, res: any, next: any) => {
  console.log("id");
  showRequest("usr.id", req.headers, [req.body, req.headers.token]);

  const ng = (code: number, packageToSend?: any, message?: string) => {
    res
      .cookie("token", "", {
        expire: "",
        httpOnly: false,
        secure: false
      })
      .status(code)
      .send(packageToSend || { status: false, message });
  };
  // check if token is available
  if (!req.headers.token) {
    // if not present, clear cookies and send code/message
    ng(400, "Token is missing");
  } else {
    // token is present
    // check if token valid
    checkToken(req.headers.token, (checkTokenResponse: any, id?: any) => {
      console.log(id);
      // reassign code
      const code = checkTokenResponse.code;
      delete checkTokenResponse.code;
      // check if code is not positive
      if (code !== 200) {
        // clear cookies  and send code/message
        ng(code, checkTokenResponse);
      } else {
        UserController.get(
          { id: req.params.id, userRequested: id },
          (controllerResponse: apiResponse) => {
            if (controllerResponse.payload) delete controllerResponse.payload;
            res.status(controllerResponse.code).send(controllerResponse);
          }
        );
      }
    });
  }
});
// get user's posts
router.get("/:id/posts", (req: any, res: any, next: any) => {
  console.log("id with posts");
  showRequest("usr.posts", req.headers, [req.body, req.headers.token]);

  const ng = (code: number, packageToSend?: any, message?: string) => {
    res
      .cookie("token", "", {
        expire: "",
        httpOnly: false,
        secure: false
      })
      .status(code)
      .send(packageToSend || { status: false, message });
  };
  // check if token is available
  if (!req.headers.token) {
    // if not present, clear cookies and send code/message
    ng(400, "Token is missing");
  } else {
    // token is present
    // check if token valid
    checkToken(req.headers.token, checkTokenResponse => {
      console.log(checkTokenResponse);
      // reassign code
      const code = checkTokenResponse.code;
      delete checkTokenResponse.code;
      // check if code is not positive
      if (code !== 200) {
        // clear cookies  and send code/message
        ng(code, checkTokenResponse);
      } else {
        UserController.get(
          { id: req.params.id, userRequested: checkTokenResponse.payload.id },
          (controllerResponse: apiResponse) => {
            res.status(controllerResponse.code).send(controllerResponse);
          }
        );
      }
    });
  }
});

// rest
router.get("/*", (req: any, res: any, next: any) => {
  console.log("user-redir");
  res.redirect(308, redirectUrl);
});
router.post("/*", (req: any, res: any, next: any) => {
  console.log("user-redir");
  res.redirect(308, redirectUrl);
});

export default router;
