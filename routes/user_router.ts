const express = require("express");

import * as UsersController from '../controllers/user_controller'

import { showRequest } from '../modules/show_request'
import { apiResponseTYPE } from '../src/types'

const router = express.Router();

// create user
router.get("/create", (req:any, res:any, next:any) => {
  console.log('create')
  showRequest(req.headers, req.query)
  const token = req.headers.token ? req.headers.token.toString() : ''
  UsersController.create({ query: req.query, token: token }, (controllerResponse: apiResponseTYPE) => {
    res.status(controllerResponse.code).send(controllerResponse);
  })
});
// check if token login available
router.get("/check", (req:any, res:any, next:any) => {
    console.log("check");

  showRequest(req.headers, req.query)
  const token = req.headers.token ? req.headers.token.toString() : ''
  UsersController.check(token, (controllerResponse: apiResponseTYPE) => {
    res.status(controllerResponse.code).send(controllerResponse);
  })
});

// get user
router.get("/:id", (req:any, res:any, next:any) => {
    console.log("id");
  showRequest(req.headers, req.params.id)
  const token = req.headers.token ? req.headers.token.toString() : ''
  UsersController.get({ id: req.params.id, token: token }, (controllerResponse: apiResponseTYPE) => {
    res.status(controllerResponse.code).send(controllerResponse);
  })
});

export default router



