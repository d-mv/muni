import { token } from "./../modules/token_gen";
const express = require("express");
import * as dotenv from "dotenv";

import compareObjects from "../modules/compare_objects";

import * as PostController from "../controllers/post_controller";
import { apiResponse } from "../src/types";
import { showRequest } from "../modules/show_request";
const router = express.Router();
// redirect to home for rest of routes
const dotEnv = dotenv.config();
const redirectUrl = process.env.SELF || "httpL//localhost:8080";

let replyCache: any = {
  create: { time: new Date(), req: "", reply: "" },
  update: { time: new Date(), req: "", reply: "" }
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

  let reply =
    diff < 1000 * time && cache.reply !== "" && compareObjects(req, cache.req);
  // if return list
  if (req === "") {
    reply = diff < 1000 * time && cache.reply !== "";
  }
  return reply;
};

/**
 * Route to create post, using POST method with object in body
 */
router.post("/create", (req: any, res: any, next: any) => {
  // information
  console.log(`§ create post...`);
  // showRequest("lcn.check", req.headers, [req.body, req.headers]);

  if (double("create", req.body, 600)) {
    console.log("~> consider double");
    res
      .status(replyCache["create"].reply.code)
      .send(replyCache["create"].reply);
  } else {
    PostController.createPost(req.body, (controllerResponse: apiResponse) => {
      caching("create", req.body, controllerResponse);
      res.status(controllerResponse.code).send(controllerResponse);
    });
  }
});

/**
 * Route to update post, using PATCH method with object in body
 * @function router.patch
 * @param {object} req - Post ID in parameters + token in header
 * @param {object} res
 * @param {object} next
 */
router.patch("/:id", (req: any, res: any, next: any) => {
  // information
  console.log(`§ update post...`);
  showRequest("lcn.check", req.headers, [req.body, req.headers.token]);

  if (double("update", req.body, 600)) {
    console.log("~> consider double");
    res
      .status(replyCache["update"].reply.code)
      .send(replyCache["update"].reply);
  } else {
    const request = { token: req.headers.token, post: req.body.post };
    PostController.updatePost(request, (controllerResponse: apiResponse) => {
      caching("update", req.body, controllerResponse);
      res.status(controllerResponse.code).send(controllerResponse);
    });
  }
});

/**
 * Route to update post, using PATCH method with object in body
 * @function router.patch
 * @param {object} req - Post ID in parameters + token in header
 * @param {object} res
 * @param {object} next
 */
router.patch("/:id/vote", (req: any, res: any, next: any) => {
  const { id } = req.params;
  const { user } = req.query;
  PostController.vote({ id, user }, (controllerResponse: apiResponse) => {
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
  showRequest("loc.delete_post", req.headers, [
    req.params,
    req.headers.token,
    req.query
  ]);

  const request = {
    token: req.headers.token,
    post: req.params.id
  };

  PostController.deletePost(request, (controllerResponse: apiResponse) => {
    res.status(controllerResponse.code).send(controllerResponse);
  });
});

router.get("/:id/reply/vote", (req: any, res: any, next: any) => {
  showRequest("loc.reply_vote", req.headers, [
    req.params,
    req.headers.token,
    req.query
  ]);

  const request = {
    token: req.headers.token,
    post: req.params.id,
    ...req.query
  };

  PostController.replyVote(request, (controllerResponse: apiResponse) => {
    res.status(controllerResponse.code).send(controllerResponse);
  });
});

export default router;
