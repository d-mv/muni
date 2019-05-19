const express = require("express");

import { showRequest } from "../modules/show_request";
import * as LocationController from "../controllers/location_controller";

import { apiResponseTYPE } from "../src/types";

const router = express.Router();

// GET request of list of locations
router.get("/list", (req:any, res:any, next:any) => {
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
router.get("/:id/posts", (req:any, res:any, next:any) => {
  showRequest(req.headers, [req.query, req.params.id]);
  const token = req.headers.token ? req.headers.token.toString() : "";
  LocationController.posts(
    { query: { location: req.params.id, options: req.query }, token: token },
    (controllerResponse: apiResponseTYPE) => {
      res.status(controllerResponse.code).send(controllerResponse);
    }
  );
});

// router.get("/create", (req:any, res:any, next:any) => {
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
// router.get("/check", (req:any, res:any, next:any) => {
//   showRequest(req.headers, req.query);
//   const token = req.headers.token ? req.headers.token.toString() : "";
//   LocationController.check(token, (controllerResponse: apiResponseTYPE) => {
//     res.send(controllerResponse);
//   });
// });

// get
// router.get("/:id", (req:any, res:any, next:any) => {
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
router.get("/*", (req:any, res:any, next:any) => {
  res.send();
});

export default router;
