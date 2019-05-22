const express = require("express");

const router = express.Router();

// rest
router.get("/*", (req: any, res: any, next: any) => {
  res.send({ status: true, message: "Welcome to the API" });
});

export default router;
