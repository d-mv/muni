const express = require("express");
import jwt from "jsonwebtoken";

import { showRequest } from "../modules/show_request";
import { hashedString, phrase, cookieFactory } from "../modules/security";

import * as UsersController from "../controllers/user_controller";

import { apiResponseTYPE } from "../src/types";

const router = express.Router();

// login
router.get("/login", (req: any, res: any, next: any) => {
  console.log("login");
  showRequest(req.headers, req.query);
  const token = req.headers.token ? req.headers.token.toString() : "";
  UsersController.login(
    { query: req.query, token: token },
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
// rest
router.get("/*", (req: any, res: any, next: any) => {
  res.send({ status: true, message: "Welcome to the API" });
});

export default router;
