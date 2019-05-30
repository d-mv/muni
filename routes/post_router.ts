const express = require("express");
import * as dotenv from "dotenv";

import * as PostController from "../controllers/post_controller";
import { apiResponse } from "../src/types";
const router = express.Router();
// redirect to home for rest of routes
const dotEnv = dotenv.config();
const redirectUrl = process.env.SELF || "httpL//localhost:8080";

/**
 * Route to create post, using POST method with object in body
 *
 * @function router.post
 * @param {object} req - Post ID in header, data in body
 * @param {object} res
 * @param {object} next
 *
 */
router.post("/create", (req: any, res: any, next: any) => {
  PostController.createPost(req, (controllerResponse: apiResponse) => {
    res.status(controllerResponse.code).send(controllerResponse);
  });
});

/**
 * Route to update post, using PATCH method with object in body
 * @function router.patch
 * @param {object} req - Post ID in parameters + token in header
 * @param {object} res
 * @param {object} next
 */
router.patch("/:id", (req: any, res: any, next: any) => {
  PostController.updatePost(req, (controllerResponse: apiResponse) => {
    res.status(controllerResponse.code).send(controllerResponse);
  });
});

/**
 * Route to delete post, using DELETE method
 * @function router.delete
 * @param {object} req - Post ID in parameters + token in header
 * @param {object} res
 * @param {object} next
 */
router.delete("/:id", (req: any, res: any, next: any) => {
  PostController.deletePost(req, (controllerResponse: apiResponse) => {
    res.status(controllerResponse.code).send(controllerResponse);
  });
});

// rest
router.get("/*", (req: any, res: any, next: any) => {
  res.redirect(308, redirectUrl);
});
router.post("/*", (req: any, res: any, next: any) => {
  res.redirect(308, redirectUrl);
});

export default router;
