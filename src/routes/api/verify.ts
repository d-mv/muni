const data = require("../../data/data.json")

const express = require("express");
const router = new express.Router();

const authenticate = require("../../middleware/direct");

router.get("/", async (req: any, res: any) => {
  const translation: { [index: string]: any } = data;
  try {
    const result = await authenticate(req.query.id);
    // choose language
    const messages = result.lang ? translation[result.lang] : translation["עב"];
    //.assign message
    const message = messages.user[result.message];

    res.status(201).render(result.message, { message });
  } catch (error) {
    res.status(400).render("malformed", { message: error });
  }
});

export default router;
