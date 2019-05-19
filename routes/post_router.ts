import express from "express";

import { showRequest } from "../modules/show_request";
import * as PostController from "../controllers/post_controller";

import { apiResponseTYPE } from "../src/types";

const router = express.Router();

/** GET request to list all the posts for the required city
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
// router.get("/list", (req, res, next) => {
//   showRequest(req.headers, req.query);
//   const token = req.headers.token ? req.headers.token.toString() : "";
//   LocationController.list(
//     { query: req.query, token: token },
//     (controllerResponse: apiResponseTYPE) => {
//       res.status(controllerResponse.code).send(controllerResponse);
//     }
//   );
// });

// router.get("/create", (req, res, next) => {
//   showRequest(req.headers, req.query);
//   const token = req.headers.token ? req.headers.token.toString() : "";
//   LocationController.create(
//     { query: req.query, token: token },
//     (controllerResponse: apiResponseTYPE) => {
//       res.send(controllerResponse);
//     }
//   );
// });
// // check if token login available
// router.get("/check", (req, res, next) => {
//   showRequest(req.headers, req.query);
//   const token = req.headers.token ? req.headers.token.toString() : "";
//   LocationController.check(token, (controllerResponse: apiResponseTYPE) => {
//     res.send(controllerResponse);
//   });
// });

// get
// router.get("/:id", (req, res, next) => {
//   showRequest(req.headers, req.params.id);
//   const token = req.headers.token ? req.headers.token.toString() : "";
//   LocationController.get(
//     { id: req.params.id, token: token },
//     (controllerResponse: apiResponseTYPE) => {
//       res.send(controllerResponse);
//     }
//   );
// });
// rest
router.get("/*", (req, res, next) => {
  res.send();
});

export default router;
