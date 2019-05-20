const express = require("express");

import { showRequest } from "../modules/show_request";
import * as PostController from "../controllers/post_controller";

import { apiResponseTYPE } from "../src/types";

const router = express.Router();

// update
router.patch("/:id", (req: any, res: any, next: any) => {
  showRequest(req.headers, [req.body, req.headers.token]);
  const token = req.headers.token ? req.headers.token.toString() : "";
  PostController.update(
    { id: req.params.id, query: req.body, token: token },
    (controllerResponse: apiResponseTYPE) => {
      res.status(controllerResponse.code).send(controllerResponse);
    }
  );
});
// create
router.post("/create", (req: any, res: any, next: any) => {
  showRequest(req.headers, [req.body, req.headers.token]);
  const token = req.headers.token ? req.headers.token.toString() : "";
  PostController.create(
    { query: req.body, token: token },
    (controllerResponse: apiResponseTYPE) => {
      res.status(controllerResponse.code).send(controllerResponse);
    }
  );
});
// rest
router.get("/*", (req: any, res: any, next: any) => {
  res.send();
});

export default router;
