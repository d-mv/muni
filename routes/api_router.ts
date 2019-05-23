const express = require("express");
import * as dotenv from "dotenv";

const router = express.Router();

const dotEnv = dotenv.config();
const redirectUrl = process.env.SELF || "httpL//localhost:8080";

// rest
router.get("/*", (req: any, res: any, next: any) => {
  res.redirect(308, redirectUrl);
});
router.post("/*", (req: any, res: any, next: any) => {
  res.redirect(308, redirectUrl);
});
export default router;
