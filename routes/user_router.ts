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
  login: { time: new Date(), req: "", reply: {} },
  update: { time: new Date(), req: "", reply: {} },
  data: { time: new Date(), req: "",reply: {}}
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



// fetch data
router.get("/data", (req: any, res: any, next: any) => {
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
    if (double("data", req.headers.token, 3)) {
      console.log("~> consider double");
      res.status(replyCache["data"].reply.code).send(replyCache["data"].reply);
    } else {
      console.log("check if token valid");
      // check if token valid
      checkToken(req.headers.token, (checkTokenResponse: any) => {
        const tmp = checkTokenResponse;
        // reassign code
        const code = checkTokenResponse.code;
        delete checkTokenResponse.code;
        // check if code is not positive
        if (code !== 200) {
          // clear cookies & send code/message
          res.cookie("token", token, options);
        }
        const packageToSend = {
          code,
          status: checkTokenResponse.status,
          payload: checkTokenResponse.payload
        };
        caching("data", req.headers.token, packageToSend);
        res.status(code).send(packageToSend);
      });
    }
  }
});

// verify email address
router.get("/verify", (req: any, res: any, next: any) => {
  const { id } = req.query;
  // information
  console.log(`§ verify email for: ${id}`);
  // showRequest("usr.check", req.headers, [req.body, id]);

  // check if ID is present
  if (!id) {
    // if not present, send code/message
    res.status(400).send({
      status: false,
      code: 400,
      message: "ID is missing"
    });
  } else {
    // ID is present
    if (double("check", id, 60)) {
      console.log("~> consider double");
      res
        .status(replyCache["check"].reply.code)
        .send(replyCache["check"].reply);
    } else {
      // check the request
      UserController.verify(id, (controllerResponse: apiResponse) => {
        caching("check", id, controllerResponse);
        res.status(controllerResponse.code).send(controllerResponse);
      });
    }
  }
});

// update
router.post("/:id/update", (req: any, res: any, next: any) => {
  const { id } = req.params;
  const { query } = req;
  // information
  console.log(`§ update user #: ${id} with ${Object.keys(query)}`);
  // showRequest("usr.check", req.headers, [req.body, id]);

  // check if ID is present
  if (!id || !query || id.length !== 24) {
    // if not present, send code/message
    res.status(400).send({
      status: false,
      code: 400,
      message: "ID and/or query is missing"
    });
  } else {
    // ID is present
    if (double("update", id, 3)) {
      console.log("~> consider double");
      res
        .status(replyCache["update"].reply.code)
        .send(replyCache["update"].reply);
    } else {
      // check the request
      UserController.update(id, query, (controllerResponse: apiResponse) => {
        caching("update", id, controllerResponse);
        res.status(controllerResponse.code).send(controllerResponse);
      });
    }
  }
});

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
        const tmp = checkTokenResponse;
        // reassign code
        const code = checkTokenResponse.code;
        delete checkTokenResponse.code;
        // check if code is not positive
        if (code !== 200) {
          // clear cookies & send code/message
          res.cookie("token", token, options);
        }
        // console.log(object)
        const packageToSend = {
          code: code,
          message: `${checkTokenResponse.message} / ${checkTokenResponse.message}`,
          status: checkTokenResponse.status,
          payload: checkTokenResponse.token
          // payload: checkTokenResponse.payload
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
  showRequest("usr.create", req.headers, [req.body, req.query]);

  UserController.create(req.query, (controllerResponse: apiResponse) => {
    if (controllerResponse.status) {
      // created, need to issue token
      console.log(controllerResponse);
      const { cookie } = controllerResponse.payload;
      delete controllerResponse.payload.cookie;
      res
        .cookie("token", cookie.token, cookie.options)
        .status(cookie.code)
        .send({ ...controllerResponse, code: cookie.code });
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

  if (double("login", req.query, 60)) {
    console.log("~> consider double");
    res.status(replyCache["login"].reply.code).send(replyCache["login"].reply);
  } else {
    UserController.login(
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
          const response:any= cookieFactory(cookieIngredients);
//  console.log("cookieFactory Response");
//  console.log(response.message);
//  console.log(Object.keys(response));
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




export default router;
