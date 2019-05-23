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

// GET request of list of locations
router.get("/list", (req: any, res: any, next: any) => {
  showRequest(req.headers, req.query);
  LocationController.list((controllerResponse: apiResponse) => {
    res.status(controllerResponse.code).send(controllerResponse);
  });
});

// GET request for list of posts
router.get("/:id/posts", (req: any, res: any, next: any) => {
  showRequest(req.headers, [req.query, req.params.id]);

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
  showRequest(req.headers, [req.body, req.query]);
  // if request is missing
  if (req.body === {}) {
    res.status(400).send({ status: false, message: "Wrong/malformed request" });
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
      ng(400, "Token is missing");
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
  // if request is missing
  if (req.body === {}) {
    res.status(400).send({
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
      ng(400, "Token is missing");
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
  showRequest(req.headers, [req.body, req.headers.token]);
  // if request is missing
  if (req.body === {}) {
    res.status(400).send({
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
      ng(400, "Token is missing");
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

// rest
router.get("/*", (req: any, res: any, next: any) => {
  res.redirect(308, redirectUrl);
});
router.post("/*", (req: any, res: any, next: any) => {
  res.redirect(308, redirectUrl);
});

export default router;
