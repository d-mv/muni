const express = require("express");

import { showRequest } from "../modules/show_request";
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
      res.send(controllerResponse);
    }
  );
});
// rest
router.get("/*", (req:any, res:any, next:any) => {
  res.send({ status: true, message: "Welcome to the API" });
});

export default router;
