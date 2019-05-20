const express = require("express");

import { showRequest } from "../modules/show_request";
import * as LocationController from "../controllers/location_controller";
import * as PostController from "../controllers/post_controller";

import { apiResponseTYPE } from "../src/types";

const router = express.Router();

// GET request of list of locations
router.get("/list", (req: any, res: any, next: any) => {
  showRequest(req.headers, req.query);
  const token = req.headers.token ? req.headers.token.toString() : "";
  LocationController.list(
    { query: req.query, token: token },
    (controllerResponse: apiResponseTYPE) => {
      res.status(controllerResponse.code).send(controllerResponse);
    }
  );
});
// GET request for list of posts
router.get("/:id/posts", (req: any, res: any, next: any) => {
  showRequest(req.headers, [req.query, req.params.id]);
  const token = req.headers.token ? req.headers.token.toString() : "";
  PostController.posts(
    // location, token and user
    { query: { location: req.params.id, options: req.query }, token: token },
    (controllerResponse: apiResponseTYPE) => {
      res.status(controllerResponse.code).send(controllerResponse);
    }
  );
});
// create 
router.post("/create", (req: any, res: any, next: any) => {
  showRequest(req.headers, [req.body, req.headers.token]);
  const token = req.headers.token ? req.headers.token.toString() : "";
  LocationController.create(
    { query: req.body, token: token },
    (controllerResponse: apiResponseTYPE) => {
      res.status(controllerResponse.code).send(controllerResponse);
    }
  );
});
// update
router.patch("/:id", (req: any, res: any, next: any) => {
  showRequest(req.headers, [req.body, req.headers.token]);
  const token = req.headers.token ? req.headers.token.toString() : "";
  LocationController.update(
    { location: req.params.id, query: req.body, token: token },
    (controllerResponse: apiResponseTYPE) => {
      res.status(controllerResponse.code).send(controllerResponse);
    }
  );
});

// delete
router.delete("/:id", (req: any, res: any, next: any) => {
  showRequest(req.headers, [req.body, req.headers.token]);
  const token = req.headers.token ? req.headers.token.toString() : "";
  LocationController.deleteLocation(
    { location: req.params.id, token: token },
    (controllerResponse: apiResponseTYPE) => {
      res.status(controllerResponse.code).send(controllerResponse);
    }
  );
});

router.get("/*", (req: any, res: any, next: any) => {
  res.send();
});

export default router;
