const express = require("express");
import * as dotenv from "dotenv";

import * as UserController from "../controllers/user_controller";

import { checkToken, cookieFactory } from "../modules/security";
import { showRequest } from "../modules/show_request";
import { apiResponseTYPE } from "../src/types";

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

// check if token valid
router.get("/check", (req: any, res: any, next: any) => {
  console.log("check");
  console.log(req.headers.token);
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
      .send({ status: false, message: "Token is missing" });
  } else {
    // token is present
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
      res.status(code).send(checkTokenResponse);
    });
  }
});
// create user
router.post("/create", (req: any, res: any, next: any) => {
  console.log("create");
  showRequest(req.headers, req.query);

  UserController.create(req.query, (controllerResponse: apiResponseTYPE) => {
    if (controllerResponse.status) {
      // created, need to issue token
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
  console.log("login");
  showRequest(req.headers, req.query);
  // const token = req.headers.token ? req.headers.token.toString() : "";
  UserController.login(
    { query: req.query },
    (controllerResponse: apiResponseTYPE) => {
      // process token/cookie
      const response = cookieFactory(controllerResponse);
      console.log("login reposne");
      console.log(response);
      res
        .cookie("token", response.token, response.options)
        .status(response.code)
        .send(response.message);
    }
  );
});
// get user
router.get("/:id", (req: any, res: any, next: any) => {
  console.log("id");
  showRequest(req.headers, req.params.id);

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
          (controllerResponse: apiResponseTYPE) => {
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
  showRequest(req.headers, req.params.id);

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
    checkToken(req.headers.token, (checkTokenResponse) => {
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
          (controllerResponse: apiResponseTYPE) => {
            res.status(controllerResponse.code).send(controllerResponse);
          }
        );
      }
    });
  }
});

// rest
router.get("/*", (req: any, res: any, next: any) => {
  res.redirect(308, redirectUrl);
});
router.post("/*", (req: any, res: any, next: any) => {
  res.redirect(308, redirectUrl);
});

export default router;
