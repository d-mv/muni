const express = require("express");
import * as dotenv from "dotenv";

import { showRequest } from "../modules/show_request";
import * as LocationController from "../controllers/location_controller";
import * as PostController from "../controllers/post_controller";
import { checkToken, cookieFactory } from "../modules/security";
import { notAuthMessage } from "../modules/response_message";
import { apiResponse } from "../src/types";

const router = express.Router();
const dotEnv = dotenv.config();
const redirectUrl = process.env.SELF || "httpL//localhost:8080";

let replyCache: any = {
  list: { time: new Date(), req: "", reply: "" }
  // create: { time: new Date(), req: "" },
  // login: { time: new Date(), req: "" },
  // id: { time: new Date(), req: "" },
  // posts: { time: new Date(), req: "" }
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
  // if return list
  if (req === "") {
    reply = diff < 1000 * time && cache.reply !== "";
  }
  return reply;
};

// GET request of list of locations
router.get("/list", (req: any, res: any, next: any) => {
  // information
  console.log(`§ get location list...`);
  // showRequest("lcn.check", req.headers, [req.body, req.headers]);

  if (double("list", "", 600)) {
    console.log("~> consider double");
    res
      .status(replyCache["list"].reply.code)
      .send(replyCache["list"].reply);
  } else {
    LocationController.list((controllerResponse: apiResponse) => {
      caching("list", "", controllerResponse);
      res.status(controllerResponse.code).send(controllerResponse);
    });
  }
});

// GET request for list of posts
router.get("/:id/posts", (req: any, res: any, next: any) => {
  showRequest("loc.get_posts", req.headers, [req.body, req.headers.token]);

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
    ng(406, "Token is missing");
  } else {
    // token is present
    // check if token valid
    checkToken(req.headers.token, (checkTokenResponse: any) => {
      // reassign code
      const code = checkTokenResponse.code;
      delete checkTokenResponse.code;
      // check if code is not positive
      if (code !== 200) {
        // clear cookies  and send code/message
        ng(code, checkTokenResponse);
      } else {
        console.log(checkTokenResponse);
        PostController.posts(
          {
            location: req.params.id,
            user: checkTokenResponse.payload.id,
            level: checkTokenResponse.level || ""
          },
          (controllerResponse: apiResponse) => {
            res.status(controllerResponse.code).send(controllerResponse);
          }
        );
      }
    });
  }
});

// create
router.post("/create", (req: any, res: any, next: any) => {
  showRequest("loc.create", req.headers, [req.body, req.headers.token]);
  // if request is missing
  if (req.body === {}) {
    res.status(406).send({ status: false, message: "Wrong/malformed request" });
  } else {
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
      ng(406, "Token is missing");
    } else {
      // token is present
      // check if token valid
      checkToken(req.headers.token, (checkTokenResponse: any) => {
        // reassign code
        const code = checkTokenResponse.code;
        delete checkTokenResponse.code;
        // check if code is not positive
        if (code !== 200) {
          // clear cookies  and send code/message
          ng(code, checkTokenResponse);
        } else if (checkTokenResponse.level === "su") {
          // if SU
          LocationController.create(
            req.body,
            (controllerResponse: apiResponse) => {
              res.status(controllerResponse.code).send(controllerResponse);
            }
          );
        } else {
          // not authorized
          res
            .status(401)
            .send(notAuthMessage("Only administrator can do that"));
        }
      });
    }
  }
});

// update
router.patch("/:id", (req: any, res: any, next: any) => {
  showRequest("loc.patch", req.headers, [req.body, req.headers.token]);

  // if request is missing
  if (req.body === {}) {
    res.status(406).send({
      status: false,
      message: "Wrong/malformed request"
    });
  } else {
    const ng = (code: number, packageToSend?: any, message?: string) => {
      res
        .cookie("token", "", {
          expire: "",
          httpOnly: false,
          secure: false
        })
        .status(code)
        .send(
          packageToSend || {
            status: false,
            message
          }
        );
    };
    // check if token is available
    if (!req.headers.token) {
      // if not present, clear cookies and send code/message
      ng(406, "Token is missing");
    } else {
      // token is present
      // check if token valid
      checkToken(req.headers.token, (checkTokenResponse: any) => {
        // reassign code
        console.log(checkTokenResponse);
        const code = checkTokenResponse.code;
        delete checkTokenResponse.code;
        // check if code is not positive
        if (code !== 200) {
          // clear cookies  and send code/message
          ng(code, checkTokenResponse);
        } else if (checkTokenResponse.level === "su") {
          // if SU
          LocationController.update(
            // location, new data to update
            req.params.id,
            req.body,
            (controllerResponse: apiResponse) => {
              res.status(controllerResponse.code).send(controllerResponse);
            }
          );
        } else {
          // not authorized
          res
            .status(401)
            .send(notAuthMessage("Only administrator can do that"));
        }
      });
    }
  }
});

// delete
router.delete("/:id", (req: any, res: any, next: any) => {
  showRequest("loc_delete", req.headers, [req.body, req.headers.token]);
  // if request is missing
  if (req.body === {}) {
    res.status(406).send({
      status: false,
      message: "Wrong/malformed request"
    });
  } else {
    const ng = (code: number, packageToSend?: any, message?: string) => {
      res
        .cookie("token", "", {
          expire: "",
          httpOnly: false,
          secure: false
        })
        .status(code)
        .send(
          packageToSend || {
            status: false,
            message
          }
        );
    };
    // check if token is available
    if (!req.headers.token) {
      // if not present, clear cookies and send code/message
      ng(406, "Token is missing");
    } else {
      // token is present
      // check if token valid
      checkToken(req.headers.token, (checkTokenResponse: any) => {
        // reassign code
        console.log(checkTokenResponse);
        const code = checkTokenResponse.code;
        delete checkTokenResponse.code;
        // check if code is not positive
        if (code !== 200) {
          // clear cookies  and send code/message
          ng(code, checkTokenResponse);
        } else if (checkTokenResponse.level === "su") {
          // if SU
          LocationController.deleteLocation(
            req.params.id,
            (controllerResponse: apiResponse) => {
              res.status(controllerResponse.code).send(controllerResponse);
            }
          );
        } else {
          // not authorized
          res
            .status(401)
            .send(notAuthMessage("Only administrator can do that"));
        }
      });
    }
  }
});


export default router;
